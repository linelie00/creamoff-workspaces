const express = require('express');
const axios = require('axios');
const qs = require('qs');
const app = express();
const PORT = 4000;

app.use(express.json());

const kakaoClientId = '950c9a7e09d0d6c00b27d8e80bb61133';
const redirectUri = 'http://localhost:4000/auth/kakao/callback';

// 카카오 로그인 요청 처리
app.post('/auth/kakao/callback', async (req, res) => {
    const { code } = req.body;

    try {
        // Kakao API로부터 액세스 토큰 받아오기
        const tokenRes = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            data: qs.stringify({
                grant_type: 'authorization_code',
                client_id: kakaoClientId,
                redirect_uri: redirectUri,
                code,
            }),
        });

        const accessToken = tokenRes.data.access_token;

        // Kakao API로부터 사용자 정보 받아오기
        const userRes = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });

        const kakaoUserInfo = userRes.data;

        // 클라이언트에게 사용자 정보 전송
        res.json(kakaoUserInfo);
    } catch (error) {
        console.error('Error getting user info from Kakao:', error);
        res.status(500).json({ message: '카카오 API 호출 중 오류가 발생했습니다.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
