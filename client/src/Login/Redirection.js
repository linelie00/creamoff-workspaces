import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const navigate = useNavigate();

    useEffect(() => {
        let authProvider = '';

        const fetchUserInfo = async () => {
            try {
                let authCode = '';

                if (window.location.pathname === '/auth/kakao') {
                    authProvider = 'kakao';
                    authCode = code;
                } else if (window.location.pathname === '/auth/naver') {
                    authProvider = 'naver';
                    authCode = code;
                } else if (window.location.pathname === '/auth/google') {
                    authProvider = 'google';
                    authCode = code;
                }

                if (!authCode) {
                    throw new Error('Authorization code not found.');
                }

                let endpoint = '';

                if (authProvider === 'kakao') {
                    endpoint = `http://localhost:8282/api/auth/kakao?code=${authCode}`;
                } else if (authProvider === 'naver') {
                    endpoint = `http://localhost:8282/api/auth/naver?code=${authCode}`;
                } else if (authProvider === 'google') {
                    endpoint = `http://localhost:8282/api/auth/google?code=${authCode}`;
                }

                const response = await axios.get(endpoint);

                const token = response.data.token;

                localStorage.setItem('token', token); // 토큰 저장

                navigate('/login-success');
            } catch (error) {
                console.error(`${authProvider} login error:`, error);
                // 오류 처리 로직 추가
            }
        };

        if (code) {
            fetchUserInfo();
        } else {
            console.error('Authorization code not found.');
        }
    }, [code, navigate]);

    return (
        <div>
            로그인 중입니다.
        </div>
    );
};

export default Redirection;
