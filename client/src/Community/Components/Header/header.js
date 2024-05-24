import React from 'react';

const Header = ({ nickname, onProfilClick}) => {
const profilUrl = `${process.env.PUBLIC_URL}/images/community/profil.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/images/community/Trailing.svg`;
  const icUrl = `${process.env.PUBLIC_URL}/images/community/alarm.svg`;

    return (
        <div className='header'>
            <div className='header-nickname'>
                <a href="/edit-user">{nickname}</a>
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
