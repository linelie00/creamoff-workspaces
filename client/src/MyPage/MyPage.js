import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import '../styles/myPage.css';

const MyPage = () => {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const petPageUrl = `${process.env.PUBLIC_URL}/images/user/petPage.svg`;
  const noteUrl = `${process.env.PUBLIC_URL}/images/user/note.svg`;
  const calendarUrl = `${process.env.PUBLIC_URL}/images/user/calendar.svg`;
  const heartUrl = `${process.env.PUBLIC_URL}/images/list/heart.svg`;
  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };
    return (
      <div lang='ko'>
          <div className='mid'>
            <div className='navigation'>
                <button>
                  <img src={arrowButtonUrl} alt='' onClick={goBack} />
                </button>
                마이페이지
                <div></div>
            </div>
            <div className='review-mid'>
              <div className='mypage-nickname-container'>
                <div className='mypage-nickname'>
                  <h1>닉네임</h1>
                  <p>수정</p>
                </div>
              </div>
              <div className='mypage-button-container'>
                <div className='mypage-button'>
                <div className='event-button'>
                        <button  onClick={() => navigate('/pet-list')}>
                            <img src={petPageUrl} alt='' />
                        </button>
                        <div className='event-button-text'>마이펫</div>
                    </div>
                    <div className='event-button'>
                        <button onClick={() => navigate('/notice')}>
                            <img src={noteUrl} alt='' />
                        </button>
                        <div className='event-button-text'>알림창</div>
                    </div>
                    <div className='event-button'>
                        <button onClick={() => navigate('/reservation')}>
                            <img src={calendarUrl} alt='' />
                        </button>
                        <div className='event-button-text'>예약내역</div>
                    </div>
                    <div className='event-button'>
                        <button onClick={() => navigate('/saved')}>
                            <img src={heartUrl} alt='' />
                        </button>
                        <div className='event-button-text'>찜한내역</div>
                    </div>
                </div>
              </div>
              <div className='mypage-info-container'>
                <div className='mypage-info'>
                  내정보관리
                </div>
                <div className='mypage-info-contents'>
                  <p>나의 리뷰 내역</p>
                  <p>이용내역</p>
                  <p>주문내역</p>
                  <p>예약패널티</p>
                </div>
              </div>
              <div className='mypage-info-container'>
                <div className='mypage-info'>
                  고객센터
                </div>
                <div className='mypage-info-contents'>
                  <p>공지사항</p>
                  <p>1:1 상담</p>
                  <p>약관보기</p>
                  <p>버전 v01.24.0</p>
                </div>
              </div>
            </div>
          </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default MyPage;