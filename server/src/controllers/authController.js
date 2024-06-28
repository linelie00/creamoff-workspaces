const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { findOrCreateUser } = require('../services/userService');
dotenv.config();

const router = express.Router();
const jwt = require('jsonwebtoken');

let kakaoAuthCodes = new Set();
let naverAuthCodes = new Set();
let googleAuthCodes = new Set(); // New Set for Google Auth Codes

const sendTokenResponse = (user, res) => {
    const payload = {
        user: {
            id: user.platform_id,
            platform: user.platform,
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
};

router.get('/kakao', async (req, res) => {
    // Existing Kakao Auth Code handling code remains unchanged
});

router.get('/naver', async (req, res) => {
    // Existing Naver Auth Code handling code remains unchanged
});

router.get('/google', async (req, res) => {
    let code;

    try {
        code = req.query.code;

        if (!code) {
            return res.status(400).json({ message: 'Authorization code not found.' });
        }

        if (googleAuthCodes.has(code)) {
            return res.status(400).json({ message: 'Authorization code already used.' });
        }

        googleAuthCodes.add(code);

        const tokenRequest = await axios({
            method: 'POST',
            url: 'https://oauth2.googleapis.com/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: 'authorization_code',
                code: code,
            },
        });

        const accessToken = tokenRequest.data.access_token;

        const userInfoRequest = await axios({
            method: 'GET',
            url: 'https://www.googleapis.com/oauth2/v1/userinfo',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userInfo = userInfoRequest.data;

        const user = await findOrCreateUser({
            platform_id: userInfo.id.toString(),
            user_email: userInfo.email || '',
            user_name: userInfo.name,
            user_nickname: userInfo.name,
            platform: 'google',
        });

        sendTokenResponse(user, res);
    } catch (error) {
        console.error('Google login error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Google login failed.' });
    } finally {
        if (code) {
            googleAuthCodes.delete(code);
        }
    }
});

module.exports = router;