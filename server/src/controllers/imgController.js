// src/controllers/imgController.js
const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../services/imgService');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const { status, url, imageId } = await uploadImage(file.buffer, file.originalname);
        res.status(status).send({ message: 'File uploaded successfully', fileUrl: url, imageId: imageId });
    } catch (error) {
        console.error('Error uploading file:', error.message);
        res.status(500).send('Error uploading file');
    }
});

module.exports = router;