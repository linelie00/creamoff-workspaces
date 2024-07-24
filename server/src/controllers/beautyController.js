const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const beautyService = require('../services/beautyService');

// 모든 업체의 이미지, 이름, 위치를 불러오는 기능
const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await beautyService.getAllBusinesses();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 특정 업체의 모든 정보를 불러오는 기능
const getBusinessById = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await beautyService.getBusinessById(id);
        res.json(business);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/businesses', authMiddleware, getAllBusinesses);
router.get('/businesses/:id', authMiddleware, getBusinessById);
module.exports = router;
