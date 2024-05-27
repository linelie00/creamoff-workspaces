import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ nickname}) => {
const Navigate = useNavigate();
const profilUrl = `${process.env.PUBLIC_URL}/images/community/profil.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/images/community/Trailing.svg`;
  const icUrl = `${process.env.PUBLIC_URL}/images/community/alarm.svg`;

  const onProfilClick = () => {
    Navigate('/my-page');
  }

    return (
        <div className='header'>
            <div className='header-nickname'>
                <Link to="/edit-user">{nickname}</Link>
                <div classNamm='header-nickname-button-container'>
                    <button className='header-nickname-button' onClick={onProfilClick}>
                        <img src={profilUrl} alt="profil" />
                    </button>
                    <button className='header-nickname-button'>
                        <img src={trailingUrl} alt="trailing" />
                    </button>
                    <button className='header-nickname-button'>
                        <img src={icUrl} alt="ic" />
                    </button>
                </div>
            </div>
            <div className='header-bar'>
                <div className='header-bar-item'>전체</div>
                <div className='header-bar-item'>인기</div>
                <div className='header-bar-item'>건강</div>
                <div className='header-bar-item'>훈련</div>
                <div className='header-bar-item'>먹이</div>
                <div className='header-bar-item'>맛집</div>
                <div className='header-bar-item'>소소한</div>
                <div className='header-bar-item'>소소한</div>
                <div className='header-bar-item'>소소한</div>
            </div>
        </div>
    );
};

export default Header;
