const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // .env 파일의 환경 변수 로드

const router = express.Router();

router.get('/auth/kakao', async (req, res) => {
  try {
    const code = req.query.code;
    
    if (!code) {
      return res.status(400).json({ message: 'Authorization code not found.' });
    }
    
    // 카카오 OAuth 토큰 요청
    const tokenRequest = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: 'http://localhost:8282/auth/kakao', // 백엔드에서 설정한 리다이렉트 URI
        code: code,
      }).toString(),
    });

    const accessToken = tokenRequest.data.access_token;
    
    // 사용자 정보 요청
    const userInfo = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // userInfo.data 에서 필요한 정보 추출하여 사용자 인증 및 처리 로직 수행
    res.json(userInfo.data);
  } catch (error) {
    console.error('카카오 간편로그인 오류:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: '카카오 간편로그인 실패' });
  }
});

module.exports = router;
