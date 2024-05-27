import React from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import '../styles/page.css';

const MainPage = () => {
  const locationUrl = `${process.env.PUBLIC_URL}/images/home/location.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/home/arrow.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/images/home/trailing.svg`;

  return (
    <div>
      <div className="mid">
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
          <div className="trailing">
            <button>
            <img src={trailingUrl} alt="trailing" />
            </button>
          </div>
        </div>
        <div className="home-container1"></div>
        <div className="home-container2"></div>
        <div className="home-container3">
          <div className="home-container3-img"></div>
          <div className="home-container3-img"></div>
        </div>
        <h1>Main Page</h1>
      </div>
        <NButtonContainer />
    </div>
  );
};

export default MainPage;