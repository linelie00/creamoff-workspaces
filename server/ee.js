const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4400;

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
const host = 'kr.object.ncloudstorage.com'; // 변경된 호스트 이름
const bucketName = 'talktail-bucket'; // 버킷 이름
const objectKey = '/acorn.png'; // 객체 키

app.get('/get-object', async (req, res) => {
    try {
        const t = new Date();
        const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, '');
        const dateStamp = amzDate.substr(0, 8); // Date w/o time, used in credential scope

        const canonicalUri = `/${bucketName}${objectKey}`; // 버킷 이름과 객체 키를 포함한 URI
        const canonicalQuerystring = '';

        const payloadHash = crypto.createHash('sha256').update('', 'utf8').digest('hex');

        const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
        const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

        const canonicalRequest = `GET\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
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
            'Host': host
        };

        console.log('Generated headers:', headers);

        const url = `https://${host}${canonicalUri}`;
        console.log('Request URL:', url);

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            headers
        });

        const filePath = path.join(__dirname, 'downloaded_file.png');
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on('finish', () => {
            console.log('File downloaded successfully');
            res.download(filePath, 'acorn.png', (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(500).send('Error sending file');
                }
                // 파일 전송 후 파일 삭제
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });
            });
        });

        writer.on('error', (err) => {
            console.error('Error writing file:', err);
            res.status(500).send('Error downloading file');
        });

    } catch (error) {
        console.error('Error retrieving object:', error.message);
        res.status(500).send('Error retrieving object');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
