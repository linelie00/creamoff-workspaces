import React, { useState, useEffect } from 'react';
import './community.css';
import '../font.css';
import CommunityList from './Components/List/CommunityList';
import NButtonContainer from './Components/NavigatorBar/NButtonContainer';
import Header from './Components/Header/Header'; // Header 컴포넌트를 임포트합니다.

const CommunityPage = () => {
  const [nickname, setNickname] = useState('');
  const floatingButtonUrl = `${process.env.PUBLIC_URL}/images/community/floatingButton.svg`;

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
        {/* 헤더 컴포넌트를 사용합니다. */}
        <Header
          nickname={nickname}
          onProfilClick={onProfilClick}
        />
        <div className='list'>
            <CommunityList />
        </div>
        <div className='navigation-bar'>
            <NButtonContainer />
        </div>
        <button className='floating-button'>
            <img src={floatingButtonUrl} alt="Floating Button" />
        </button>
    </div>
  );
};

export default CommunityPage;
