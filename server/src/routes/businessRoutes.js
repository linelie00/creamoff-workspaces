const express = require('express');
const multer = require('multer');
const router = express.Router();
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const businessController = require('../controllers/businessController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

dotenv.config();

router.get('/businesses', businessController.getAllBusinesses);
router.get('/businesses/:id', authMiddleware, businessController.getBusinessById);
router.post('/businesses', upload.fields([
    { name: 'main', maxCount: 1 },
    { name: 'sub', maxCount: 10 },
    { name: 'album', maxCount: 10 },
    { name: 'review', maxCount: 10 },
    { name: 'pricing', maxCount: 10 }
]), businessController.createBusiness);

module.exports = router;