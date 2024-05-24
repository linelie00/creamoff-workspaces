import React from 'react';
import './community.css';
import '../font.css';

const CommunityPage = () => {
  const floatingButtonUrl = `${process.env.PUBLIC_URL}/images/floatingButton.svg`;

  return (
    <div>
        <div className='navigation' lang='ko'>
          커뮤니티
        </div>
        <div className='header'>
            <div className='header-nickname'>
                <a href="/edit-user">닉네임</a>
            </div>
            <div className='header-bar'>
            </div>
        </div>
        <div className='navigation-bar'></div>
        <button className='floating-button'>
            <img src={floatingButtonUrl} alt="Floating Button" />
        </button>
    </div>
  );
};

export default CommunityPage;
