import React, { useRef, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import '../styles/page.css';

const MainPage = () => {
  const locationUrl = `${process.env.PUBLIC_URL}/images/home/location.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/home/arrow.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/images/home/trailing.svg`;

  const imageNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX); // 스크롤 속도 조정
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

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
        <div 
          className="home-container3" 
          ref={containerRef}
          onMouseDown={startDrag}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={onDrag}
        >
          <div className="margin"></div>
          {imageNumbers.map((number) => (
            <div className="home-container3-img" key={number}>
              <div className="img-number">
                {number}/9
              </div>
            </div>
          ))}
        </div>
        <div className="category">
        <div className="text">카테고리</div>
        <div className="button-grid">
        <div className="button-grid-con">
        <div className="button-item">
            </div>
            <div className="button-item">
            </div>
            <div className="button-item">
            </div>
            <div className="button-item">
            </div>
        </div>
        <div className="button-grid-con">
            <div className="button-item">
            </div>
            <div className="button-item">
            </div>
            <div className="button-item">
            </div>
            <div className="button-item">
            </div>
        </div>
      </div>
      </div>
        <div className="home-container4">
          <div className="margin"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
        </div>
      </div>
      <NButtonContainer />
    </div>
  );
};

export default MainPage;
