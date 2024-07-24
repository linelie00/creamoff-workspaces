const express = require('express');
const router = express.Router();
const beautyController = require('../controllers/beautyController');

router.post('/beauty', beautyController);

module.exports = router;