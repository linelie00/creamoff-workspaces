const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // 인증 미들웨어 추가
const { getUserById } = require('../services/userService'); // 사용자 서비스 경로

// 사용자 프로필 정보 가져오기
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // JWT 미들웨어를 통해 인증된 사용자 ID를 가져옴
    const user = await getUserById(userId); // 사용자 정보를 데이터베이스에서 가져옴
    
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    res.json(user); // 사용자 정보를 JSON 형태로 클라이언트에 반환
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch user profile.' });
  }
};

// 프로필 라우트 설정
router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;
