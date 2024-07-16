const express = require('express');
const petController = require('../controllers/petController');

const router = express.Router();

router.use('/pet', petController);

module.exports = router;