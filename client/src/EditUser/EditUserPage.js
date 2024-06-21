import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditUserPage = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const fileUrl = `${process.env.PUBLIC_URL}/images/user/file.svg`;
    const rightUrl = `${process.env.PUBLIC_URL}/images/user/right.svg`;

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
                        <p>홍길동</p>
                      </div>
                    </div>
                    <div className='edit-textbox'>
                      <div className='edit-text'>
                        <p>닉네임</p>
                        <p>닉네임</p>
                      </div>
                    </div>
                    <div className='edit-textbox'>
                    <div className='edit-text'>
                        <p>전화번호</p>
                        <p>010-1234-5678</p>
                      </div>
                      <button>인증완료</button>
                    </div>
                    <div className='edit-textbox'>
                    <div className='edit-text'>
                        <p>주소</p>
                        <p>주소를 입력해주세요.</p>
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
                      <p>creamoff2021@naver.com</p>
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
