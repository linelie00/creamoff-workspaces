const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config(); // .env 파일의 환경 변수 로드

const router = express.Router();

let accessToken = null; // 토큰을 저장할 변수

router.get('/kakao', async (req, res) => {
  try {
    const code = req.query.code;
    
    if (!code) {
      return res.status(400).json({ message: 'Authorization code not found.' });
    }

    console.log(`Request query params: ${JSON.stringify(req.query)}`);
    
    // 토큰이 없는 경우에만 토큰 요청을 수행
    if (!accessToken) {
      const tokenRequest = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: 'http://localhost:3000/auth/kakao', // 백엔드에서 설정한 리다이렉트 URI
          code: code,
        },
      });

      accessToken = tokenRequest.data.access_token; // 토큰 저장
    }
    
    // 사용자 정보 요청
    const userInfo = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // userInfo.data 에서 필요한 정보 추출하여 사용자 인증 및 처리 로직 수행
    console.log(userInfo.data); // 사용자 정보를 콘솔에 출력
    res.json(userInfo.data);
  } catch (error) {
    console.error('카카오 간편로그인 오류:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: '카카오 간편로그인 실패' });
  }
});

module.exports = router;
