import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const EditUserPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
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

    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

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

    useEffect(() => {
        if (location.state?.address) {
            setUserInfo(prevUserInfo => ({
                ...prevUserInfo,
                address: location.state.address
            }));
        }
    }, [location.state]);

    const handleNicknameChange = (e) => {
        setUserInfo({ ...userInfo, nickname: e.target.value });
    };

    const handleNicknameBlur = () => {
        setIsEditingNickname(false);
        // API 호출 또는 로컬 스토리지 업데이트 등을 수행할 수 있음
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }

            const response = await axios.put('http://localhost:8282/api/user/profile', userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert('User information updated successfully');
                // 필요한 경우, 추가적인 로직을 여기에 추가
            } else {
                throw new Error('Failed to update user information');
            }
        } catch (error) {
            console.error('Error updating user information:', error);
            alert('Failed to update user information');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const navigateToEditAddress = () => {
        navigate('/edit-address', { state: { prevPath: '/edit-user' } });
    };

    return (
        <div lang='ko' className='mid'>
            <div className='navigation'>
                <button onClick={goBack}>
                    <img src={arrowButtonUrl} alt='' />
                </button>
                개인정보수정
                <button onClick={handleSave}>
                    <img src={fileUrl} alt='' />
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
                                {isEditingNickname ? (
                                    <input
                                        type="text"
                                        value={userInfo.nickname}
                                        onChange={handleNicknameChange}
                                        onBlur={handleNicknameBlur}
                                        autoFocus
                                    />
                                ) : (
                                    <p onClick={() => setIsEditingNickname(true)}>{userInfo.nickname}</p>
                                )}
                            </div>
                        </div>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>전화번호</p>
                                <p>{userInfo.phoneNumber}</p>
                            </div>
                            {isVerified ? (
                                <button className='verified'>
                                    인증완료
                                </button>
                            ) : (
                                <button className='not-verified'>
                                    인증하기
                                </button>
                            )}
                        </div>
                        <div className='edit-textbox'>
                            <div className='edit-text'>
                                <p>주소</p>
                                <p>{userInfo.address || '주소를 입력해주세요.'}</p>
                            </div>
                            <img src={rightUrl} alt='' onClick={navigateToEditAddress}/>
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
                            <img src={rightUrl} alt='' />
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
