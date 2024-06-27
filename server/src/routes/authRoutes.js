const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

router.use('/auth', authController);
router.use('/user', userController);

// 보호된 프로필 라우트 정의
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: '보호된 프로필 라우트', user: req.user });
});

module.exports = router;
