// src/services/imgService.js
const crypto = require('crypto');
const axios = require('axios');
const { PassThrough } = require('stream');
const { generateUniqueFileName } = require('../utils/fileUtils');
const { accessKey, secretKey, region, service, endpoint, bucketName } = require('../config/awsConfig');
const Image = require('../../models/Image'); // Sequelize 모델 임포트
const { create } = require('domain');

const sign = (key, msg) => crypto.createHmac('sha256', key).update(msg, 'utf8').digest();
const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
    const kDate = sign(('AWS4' + key), dateStamp);
    const kRegion = sign(kDate, regionName);
    const kService = sign(kRegion, serviceName);
    const kSigning = sign(kService, 'aws4_request');
    return kSigning;
};

const uploadImageToBucket = async (fileBuffer, objectName) => {
    const t = new Date();
    const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substr(0, 8);

    const canonicalUri = `/${bucketName}/${objectName}`;
    const payloadHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    const canonicalHeaders = `host:${endpoint}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
    const canonicalRequest = `PUT\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
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
        'Content-Length': fileBuffer.length,
        'Content-Type': 'image/png', // 파일의 실제 Content-Type을 설정해야 합니다.
        'Host': endpoint
    };

    const fileStream = new PassThrough();
    fileStream.end(fileBuffer);

    const url = `https://${endpoint}${canonicalUri}`;
    const response = await axios.put(url, fileStream, { headers });

    return url;
};

const uploadMultipleImages = async (files, businessId) => {
    const results = [];

    for (const file of files) {
        const folder = file.fieldname;
        const objectName = `${folder}/${generateUniqueFileName(file.originalname)}`;
        const url = await uploadImageToBucket(file.buffer, objectName);
        console.log('Uploaded:', url);

        // DB에 이미지 정보 저장
        const image = await Image.create({
            business_id: businessId,
            image_type: folder,
            endpoint: url,
            create_at: new Date(),
            update_at: new Date(),
        });

        results.push({ url, imageId: image.id });
    }

    return results;
};

const LookupImageById = async (id) => {
    const image = await Image.findByPk(id);
    return image;
};

module.exports = {
    uploadMultipleImages,
    LookupImageById
};