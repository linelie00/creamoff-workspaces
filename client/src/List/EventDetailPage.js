import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventTags from './EventTags';
import axios from 'axios';
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
    const [business, setBusiness] = useState({
        id: '',
        name: '',
        location: '',
        tags: [],
        images: { main: '', sub: [], album: [], review: [], pricing: [] }, // 기본 구조 설정
        weekday_open_time: '',
        weekday_close_time: '',
        weekend_open_time: '',
        weekend_close_time: '',
        dayoff: '',
        contents: '',
    });
    

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

    // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/businesses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setBusiness(response.data);
            console.log('Business fetched:', response.data);
        } catch (error) {
            console.error('Error fetching business:', error);
        }
        };
        fetchBusiness();
    }, [id]);

    // 주어진 시간 데이터를 'HH:MM:SS' 형식에서 'HH:MM' 형식으로 변환
const formatTime = (time) => {
    if (!time) return ''; // null 또는 undefined 처리
    const [hour, minute] = time.split(':'); // ':'를 기준으로 분할
    return `${hour}:${minute}`; // 시간과 분을 합쳐서 반환
  };
  
  // 사용 예시
  const weekdayOpenTime = formatTime(business.weekday_open_time);
  const weekdayCloseTime = formatTime(business.weekday_close_time);
  const weekendOpenTime = formatTime(business.weekend_open_time);
  const weekendCloseTime = formatTime(business.weekend_close_time);

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack}/>
                    </button>
                    상세보기
                    <div></div>
                </div>
                <div className='event-img'>
                    {business.images.main ? (
                        <img src={business.images.main} alt='Main Event' />
                    ) : (
                        <p>이미지가 없습니다</p> // 이미지가 없는 경우에 대한 대체 텍스트
                    )}
                </div>
                <div className='event-title'>
                    <div>{business.name}</div>
                    <div className={`event-title-button ${isButtonClicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                        {isButtonClicked ? '예약대기' : '예약가능'}
                    </div>
                </div>
                <div className='event-address'>
                    <span>{business.location}</span>
                    <div className='event-tag-container'>
                        <EventTags tags={business.tags} />
                    </div>
                    <p>평일｜{weekdayOpenTime}~{weekdayCloseTime}</p>
                    <p>주말｜{weekendOpenTime}~{weekendCloseTime}</p>
                    <p>{business.dayoff} 휴무</p>
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
                    {business.contents}
                </div>
                <div className="album-text">
                    Album
                </div>
                <div className="grid-container">
                    {business.images.album && business.images.album.length > 0 ? (
                        business.images.album.map((imageUrl, index) => (
                            <div className="grid-item" key={index}>
                                <img src={imageUrl} alt={`Album Image ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                        <p>앨범 사진이 없습니다</p> // 앨범 사진이 없을 경우 메시지 표시
                    )}
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
