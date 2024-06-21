import React, { useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate } from "react-router-dom";

const ListPage = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/images/list/map.svg`;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={goBack}/>
        </button>
        미용
        <div></div>
      </div>
      <div className={`list-header ${isDropdownOpen ? 'open' : ''}`}>
        <div className='list-header-i'>
          <div className='list-header-item' onClick={toggleDropdown}>
            거리 순
            <button>
              <img src={arrowUrl} alt='arrow'/>
            </button>
          </div>
          <button>
          <img src={mapUrl} alt='map' onClick={() => navigate('/list-map')}/>
        </button>
        </div>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <div className='dropdown-item'>평점 오름차 순</div>
            <div className='dropdown-item'>평점 내림차 순</div>
            <div className='dropdown-item'>가격 오름차 순</div>
            <div className='dropdown-item'>가격 내림차 순</div>
            <div className='dropdown-item'>쌓인 후기 오름차 순</div>
            <div className='dropdown-item'>쌓인 후기 내림차 순</div>
          </div>
        )}
      </div>
      <div className="list-mid-h">
        <List />
      </div>
      <NButtonContainer />
    </div>
  );
};

export default ListPage;
