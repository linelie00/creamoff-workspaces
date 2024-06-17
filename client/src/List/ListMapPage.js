import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate } from "react-router-dom";

const ListMapPage = () => {
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const locationUrl = `${process.env.PUBLIC_URL}/images/home/location.svg`;

  return (
    <div>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/list')}/>
        </button>
        지도에서 찾기
      </div>
      <div className="home-header">
          <div className="home-location">
            <button>
              <img src={locationUrl} alt="location" />
            </button>
            위치를 설정하세요.
            <button>
              <img src={arrowUrl} alt="arrow" />
            </button>
          </div>
        </div>
      <List />
      <NButtonContainer />
    </div>
  );
};

export default ListMapPage;
