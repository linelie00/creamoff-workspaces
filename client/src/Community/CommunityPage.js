import React, { useState, useEffect } from 'react';
import './community.css';
import '../font.css';

const CommunityPage = () => {
  const [nickname, setNickname] = useState('');
  const floatingButtonUrl = `${process.env.PUBLIC_URL}/images/floatingButton.svg`;


  useEffect(() => {
    const fetchNickname = async () => {
      const fetchedNickname = '닉네임';
      setNickname(fetchedNickname);
    };

    fetchNickname();
  }, []);

  const onProfilClick = () => {
    window.location.href = '/edit-user';
  }

  return (
    <div>
        <div className='navigation' lang='ko'>
          커뮤니티
        </div>
        <div className='header'>
            <div className='header-nickname'>
                <a href="/edit-user">{nickname}</a>
                <div classNamm='header-nickname-button-container'>
                    <button className='header-nickname-button' onClick={onProfilClick}>
                        <img src={`${process.env.PUBLIC_URL}/images/profil.svg`} alt="profil" />
                    </button>
                    <button className='header-nickname-button'>
                        <img src={`${process.env.PUBLIC_URL}/images/Trailing.svg`} alt="profil" />
                    </button>
                    <button className='header-nickname-button'>
                        <img src={`${process.env.PUBLIC_URL}/images/ic.svg`} alt="profil" />
                    </button>
                </div>
            </div>
            <div className='header-bar'>
            </div>
        </div>
        <div className='list'>
        </div>
        <div className='navigation-bar'></div>
        <button className='floating-button'>
            <img src={floatingButtonUrl} alt="Floating Button" />
        </button>
    </div>
  );
};

export default CommunityPage;
