import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate } from "react-router-dom";
import '../styles/myPage.css';

const MyPage = () => {
    return (
      <div lang='ko'>
          <div className='mid'>
            <div className='navigation'>
                <div></div>
                찜한내역
                <div></div>
            </div>
            <div className='review-mid'>
                <div className='saved-container'>
                  <div className='saved-textbox'>
                      <h1>한라마운틴미용실</h1>
                      <p>제주특별자치도 한라시 한라읍 한라동 387-8번지 101호 백록담</p>
                  </div>
                  <div className='saved-buttonbox'>
                    <button>
                      삭제
                    </button>
                    <button className='r-b'>
                      바로 예약
                    </button>
                  </div>
                </div>
            </div>
          </div>
          <NButtonContainer />
      </div>
    );
  };
  
  export default MyPage;