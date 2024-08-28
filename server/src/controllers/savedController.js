const express = require('express');
const router = express.Router();
const savedService = require('../services/savedService');

router.post('/saved', async (req, res) => {
    try {
        const { id, platform } = req.user;
        const { business_id } = req.body;
        console.log('id', id);
        console.log('platform', platform);
        console.log('businessId', business_id);
        const saved = await savedService.registerSaved(id, platform, business_id);
        res.json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/saved', async (req, res) => {
    try {
        const { id, platform } = req.user;
        const saved = await savedService.getSaved(id, platform);
        res.json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;