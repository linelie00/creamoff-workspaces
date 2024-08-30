import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../Api';

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

    const updateUserInfo = (address, zonecode) => {
        console.log('Updating user info with:', userInfo, address, zonecode);
        setUserInfo((prevUserInfo) => ({
            ...prevUserInfo,
            address: `${address} (${zonecode})`
        }));
        console.log('Updated user info:', userInfo);
    };

    useEffect(() => {
        console.log('Updated user info:', userInfo);
    }, [userInfo]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }

                const response = await api.get('/api/user/profile', {
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

                // 주소와 zonecode가 있으면 userInfo 업데이트
                if (location.state && (location.state.address || location.state.zonecode)) {
                    const { address, zonecode } = location.state;
                    console.log('Received address:', address, zonecode);
                    updateUserInfo(address, zonecode);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // 오류 처리 로직 추가
            }
        };

        fetchUserData();
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

            const response = await api.put('/api/user/profile', userInfo, {
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

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

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
                            <p onClick={Logout}>로그아웃</p>
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
