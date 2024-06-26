import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
    const code = new URLSearchParams(window.location.search).get('code'); // URL 쿼리에서 인가 코드 추출
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8282/api/auth/kakao?code=${code}`);
                console.log(response.data);

                // 사용자 정보를 로컬 스토리지에 저장하는 예시 (필요에 따라 변경)
                localStorage.setItem('user', JSON.stringify(response.data));

                // 로그인 성공 후 이동할 경로로 리디렉션
                navigate('/loginSuccess');
            } catch (error) {
                console.error('Kakao login error:', error);
                // 오류 처리 로직 추가
            }
        };

        if (code) {
            fetchUserInfo();
        } else {
            console.error('Authorization code not found.');
        }
    }, [code, navigate]);

    return <div>로그인 중입니다.</div>;
};

export default Redirection;
