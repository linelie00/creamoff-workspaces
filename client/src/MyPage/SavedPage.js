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
                <div></div>
                찜한내역
                <div></div>
            </div>
            <div className='review-mid'>
            
            </div>
          </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default MyPage;