const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { PassThrough } = require('stream');

const app = express();
const port = 4400;
//const upload = multer({ dest: 'uploads/' }); // Multer 설정

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true  // 인증정보 (쿠키, 인증 헤더 등)를 전송할 수 있도록 허용
  }));

// AWS Signature Version 4 signing algorithm
const sign = (key, msg) => crypto.createHmac('sha256', key).update(msg, 'utf8').digest();
const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
    const kDate = sign(('AWS4' + key), dateStamp);
    const kRegion = sign(kDate, regionName);
    const kService = sign(kRegion, serviceName);
    const kSigning = sign(kService, 'aws4_request');
    return kSigning;
};

// Set your credentials
const accessKey = 'ID78eMTYRulNd0UHWOjv';
const secretKey = 'FezU8BHn4P5pMfMunT87QzWtSZODebmLSd8GViLQ';
const region = 'kr';
const service = 's3';
const endpoint = 'kr.object.ncloudstorage.com';
const bucketName = 'talktail-bucket';

const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const objectName = file.originalname; // 업로드할 오브젝트 이름

        const t = new Date();
        const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, '');
        const dateStamp = amzDate.substr(0, 8); // Date w/o time, used in credential scope

        const canonicalUri = `/${bucketName}/${objectName}`;
        const canonicalQuerystring = '';

        const payloadHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

        const canonicalHeaders = `host:${endpoint}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
        const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

        const canonicalRequest = `PUT\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
        const algorithm = 'AWS4-HMAC-SHA256';
        const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
        const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')}`;

        const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
        const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');

        const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

        const headers = {
            'Authorization': authorizationHeader,
            'x-amz-date': amzDate,
            'x-amz-content-sha256': payloadHash,
            'Content-Length': file.size,
            'Content-Type': file.mimetype,
            'Host': endpoint
        };

        console.log('Generated headers:', headers);

        // Convert file buffer to readable stream
        const fileStream = new PassThrough();
        fileStream.end(file.buffer);

        const url = `https://${endpoint}${canonicalUri}`;
        console.log('Request URL:', url);

        const response = await axios.put(url, fileStream, { headers });

        console.log('Response status:', response.status);
        res.status(response.status).send('File uploaded successfully');
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).send('Error uploading file');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});