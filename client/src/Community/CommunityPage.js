import React, { useState, useEffect } from 'react';
import '../styles/page.css';
import '../font.css';
import CommunityList from './Components/List/CommunityList';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import Header from './Components/Header/Header'; // Header 컴포넌트를 임포트합니다.
import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const Navigate = useNavigate();
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
    Navigate('/edit-user');
  }

  return (
    <div lang='ko'>
        <div className='navigation'>
          <div></div>
          커뮤니티
          <div></div>
        </div>
        <Header
          nickname={nickname}
          onProfilClick={onProfilClick}
        />
        <CommunityList />
        <NButtonContainer />
        <button className='floating-button'>
            <img src={floatingButtonUrl} alt="Floating Button" />
        </button>
    </div>
  );
};

export default CommunityPage;
