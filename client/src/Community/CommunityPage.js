import React from 'react';
import './community.css';

const CommunityPage = () => {
  const floatingButtonUrl = `${process.env.PUBLIC_URL}/images/floatingButton.svg`;

  return (
    <div>
        <div className='navigation'>
            커뮤니티
        </div>
        <div className='header'>
            <div className='header-nickname'>
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
