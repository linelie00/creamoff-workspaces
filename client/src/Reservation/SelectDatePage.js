import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const calenderUrl = `${process.env.PUBLIC_URL}/images/list/calender.svg`;

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    예약신청서
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='schedule-container'>
                        <div className='schedule-contents'>
                            <div className='schedule'>
                                2024/03/04
                                <button>
                                    <img src={calenderUrl} alt=''/>
                                </button>
                            </div>
                        </div>
                        <div className='schedule-contents'>
                            <div className='schedule'>
                                <div>오후</div>
                                <div>12시</div>
                                <div>30분</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='Nbutton' onClick={() => navigate('/reservation-confirm')}>예약등록</div>
        </div>
    );
};

export default Review;
