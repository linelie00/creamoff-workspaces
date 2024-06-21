import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import '../styles/myPage.css';

const ReservationPage = () => {
  const navigate = useNavigate();
  
    return (
      <div lang='ko'>
          <div className='mid'>
            <div className='navigation'>
                <div></div>
                예약내역
                <div></div>
            </div>
            <div className='review-mid'>
            </div>
          </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default ReservationPage;