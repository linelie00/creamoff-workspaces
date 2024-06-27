import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUserPage = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const fileUrl = `${process.env.PUBLIC_URL}/images/user/file.svg`;
    const rightUrl = `${process.env.PUBLIC_URL}/images/user/right.svg`;

    const [userInfo, setUserInfo] = useState({
        name: '',
        nickname: '',
        phoneNumber: '',
        address: '',
        email: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }

                const response = await axios.get('http://localhost:8282/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setUserInfo({
                    name: userData.user_name,
                    nickname: userData.user_nickname,
                    phoneNumber: userData.user_phone,
                    address: userData.user_address,
                    email: userData.user_email
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                // 오류 처리 로직 추가
            }
        };

        fetchUserData();
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div lang='ko' className='mid'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={goBack} />
                </button>
                개인정보수정
                <button>
                    <img src={fileUrl} alt='' onClick={goBack}/>
                </button>
            </div>
            <div className='edit-mid'>
                <div className='edit-info-container'>
                    <div className='mypage-info'>
                        개인정보 수정
                    </div>
                    <div className='edit-info-contents'>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>이름</p>
                                <p>{userInfo.name}</p>
                            </div>
                        </div>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>닉네임</p>
                                <p>{userInfo.nickname}</p>
                            </div>
                        </div>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>전화번호</p>
                                <p>{userInfo.phoneNumber}</p>
                            </div>
                            <button>인증완료</button>
                        </div>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>주소</p>
                                <p>{userInfo.address || '주소를 입력해주세요.'}</p>
                            </div>
                            <img src={rightUrl} alt=''/>
                        </div>
                    </div>
                </div>
                <div className='edit-info-container'>
                    <div className='mypage-info'>
                        계정정보
                    </div>
                    <div className='edit-info-contents'>
                        <div className='edit-textbox2'>
                            <p>이메일</p>
                            <p>{userInfo.email}</p>
                            <img src={rightUrl} alt=''/>
                        </div>
                        <div className='edit-textbox2'>
                            <p>개인정보 유효기간</p>
                            <button>변경</button>
                        </div>
                        <div className='edit-textbox2'>
                            <p>로그아웃</p>
                        </div>
                        <div className='edit-textbox'>
                            <p>탈퇴</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
