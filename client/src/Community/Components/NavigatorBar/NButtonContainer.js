import React from "react";
import '../components.css';

const NButtonContainer = ({ buttons }) => {
    const reservationUrl = `${process.env.PUBLIC_URL}/images/community/reservation.svg`;
    const noticeUrl = `${process.env.PUBLIC_URL}/images/community/notice.svg`;
    const communityUrl = `${process.env.PUBLIC_URL}/images/community/community.svg`;
    const homeUrl = `${process.env.PUBLIC_URL}/images/community/home.svg`;
    const myPageUrl = `${process.env.PUBLIC_URL}/images/community/myPage.svg`;
    
    return (
        <>
            <button className='header-nickname-button'>
                <img src={reservationUrl} alt="profil" />
            </button>
            <button className='header-nickname-button'>
                <img src={noticeUrl} alt="trailing" />
            </button>
            <button className='header-nickname-button'>
                <img src={communityUrl} alt="ic" />
            </button>
            <button className='header-nickname-button'>
                <img src={homeUrl} alt="ic" />
            </button>
            <button className='header-nickname-button'>
                <img src={myPageUrl} alt="ic" />
            </button>
        </>
    );
}

export default NButtonContainer;