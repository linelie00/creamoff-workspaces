import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate } from "react-router-dom";

const ListMapPage = () => {
  const [activeDiv, setActiveDiv] = useState(null); // state to track which div is active
  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const locationUrl = `${process.env.PUBLIC_URL}/images/home/location.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/images/list/kakao_map.svg`;

  const handleDivClick = (divName) => {
    setActiveDiv(divName);
  };

  return (
    <div>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={() => navigate('/list')}/>
        </button>
        지도에서 찾기
      </div>
      <div 
        className={`list-map ${activeDiv === 'map' ? 'active' : ''}`} 
        onClick={() => handleDivClick('map')}
      >
        <img src={mapUrl} alt=''/>
      </div>
      <div 
        className={`list-map-mid ${activeDiv === 'mid' ? 'active' : ''}`} 
        onClick={() => handleDivClick('mid')}
      >
        <div className="home-header">
          <div className="home-location">
            <button>
              <img src={locationUrl} alt="location" />
            </button>
            매호동
          </div>
        </div>
        <div 
          className={`list-map-mid-mid ${activeDiv === 'mid' ? 'active' : ''}`} 
          onClick={() => handleDivClick('mid')}
        >
          <List />
        </div>
      </div>
      <NButtonContainer />
    </div>
  );
};

export default ListMapPage;
