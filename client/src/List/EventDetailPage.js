import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/listPage.css';

const EventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const eventImgUrl = `${process.env.PUBLIC_URL}/images/list/event_img.svg`;
    const locationUrl = `${process.env.PUBLIC_URL}/images/list/location.svg`;
    const callUrl = `${process.env.PUBLIC_URL}/images/list/call.svg`;
    const shareUrl = `${process.env.PUBLIC_URL}/images/list/share.svg`;
    const heartUrl = `${process.env.PUBLIC_URL}/images/list/heart.svg`;
    const image1Url = `${process.env.PUBLIC_URL}/images/list/pictures/image1.jpg`;
    const image2Url = `${process.env.PUBLIC_URL}/images/list/pictures/image2.jpg`;
    const image3Url = `${process.env.PUBLIC_URL}/images/list/pictures/image3.jpg`;
    const image4Url = `${process.env.PUBLIC_URL}/images/list/pictures/image4.jpg`;
    const image5Url = `${process.env.PUBLIC_URL}/images/list/pictures/image5.jpg`;
    const image6Url = `${process.env.PUBLIC_URL}/images/list/pictures/image6.jpg`;
    const image7Url = `${process.env.PUBLIC_URL}/images/list/pictures/image7.jpg`;
    const image8Url = `${process.env.PUBLIC_URL}/images/list/pictures/image8.jpg`;
    const image9Url = `${process.env.PUBLIC_URL}/images/list/pictures/image9.jpg`;
    const noteUrl = `${process.env.PUBLIC_URL}/images/list/note.svg`;

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const accordionRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - accordionRef.current.offsetLeft);
        setScrollLeft(accordionRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - accordionRef.current.offsetLeft;
        const walk = (x - startX); // 스크롤 속도 조절
        accordionRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={() => navigate('/list')}/>
                    </button>
                    상세보기
                    <div></div>
                </div>
                <div className='event-img'>
                    <img src={eventImgUrl} alt='event' />
                </div>
                <div className='event-title'>
                    <div>한라마운틴미용실</div>
                    <div className={`event-title-button ${isButtonClicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                        {isButtonClicked ? '예약대기' : '예약가능'}
                    </div>
                </div>
                <div className='event-address'>
                    <div>제주특별자치도 한라시 한라읍 한라동</div>
                    <div>387-8번지 101호 백록담</div>
                    <div className='event-tag-container'>
                        <div className='list-tag'>소형견</div>
                        <div className='list-tag'>대형견</div>
                        <div className='list-tag'>예약제</div>
                        <div className='list-tag'>상담가능</div>
                        <div className='list-tag'>연중무휴</div>
                    </div>
                    <p>평일｜9:00~18:00</p>
                    <p>주말｜9:00~18:00</p>
                    <p>매주 목요일 휴무</p>
                </div>
                <div className='event-button-container'>
                    <div className='event-button'>
                        <button>
                            <img src={locationUrl} alt='' />
                        </button>
                        <div className='event-button-text'>위치</div>
                    </div>
                    <div className='event-button'>
                        <button>
                            <img src={callUrl} alt='' />
                        </button>
                        <div className='event-button-text'>전화</div>
                    </div>
                    <div className='event-button'>
                        <button>
                            <img src={shareUrl} alt='' />
                        </button>
                        <div className='event-button-text'>공유</div>
                    </div>
                    <div className='event-button'>
                        <button>
                            <img src={heartUrl} alt='' />
                        </button>
                        <div className='event-button-text'>찜</div>
                    </div>
                </div>
                <div className="event-text-box">
                    우리 아이처럼 소중하게 미용하겠습니다~! 
                </div>
                <div className="album-text">
                    Album
                </div>
                <div className="grid-container">
                    <div className="grid-item"><img src={image1Url} alt="" /></div>
                    <div className="grid-item"><img src={image2Url} alt="" /></div>
                    <div className="grid-item"><img src={image3Url} alt="" /></div>
                    <div className="grid-item"><img src={image4Url} alt="" /></div>
                    <div className="grid-item"><img src={image5Url} alt="" /></div>
                    <div className="grid-item"><img src={image6Url} alt="" /></div>
                    <div className="grid-item"><img src={image7Url} alt="" /></div>
                    <div className="grid-item"><img src={image8Url} alt="" /></div>
                    <div className="grid-item"><img src={image9Url} alt="" /></div>
                </div>
                <div className='album-more'>
                    더보기∨
                </div>
                <div className='information-text'>
                    Price information
                </div>
                <div className='event-accordion' onClick={toggleAccordion}>
                    {isAccordionOpen ? '강아지∧' : '강아지∨'}
                </div>
                <div className='border'></div>
                {isAccordionOpen && (
                    <div className='accordion-hidden-div'>
                        <div className="table-container"
                        ref={accordionRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        >
                            <table className='custom-table'>
                                <tbody>
                                    <tr className='gray-row'>
                                        <td>무게</td>
                                        <td>목록</td>
                                        <td>위생</td>
                                        <td>위생+목욕</td>
                                        <td>전체커트</td>
                                        <td>스포팅</td>
                                        <td>부분컷</td>
                                    </tr>
                                    <tr>
                                        <td>소형</td>
                                        <td>25.0</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>대형</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~4.9kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~6.9kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~7.9kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~8.9kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~9.9kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>~10kg</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                <div className='album-text'>
                    review
                </div>
                <div className='writing-div'>
                    <div className='writing'>
                        <img src={noteUrl} alt=''/>
                        작성된 글이 없습니다.
                    </div>
                </div>
            </div>
            <div className='Nbutton' onClick={() => navigate('/pet-select')}>예약하기</div>
        </div>
    );
};

export default EventDetailPage;
