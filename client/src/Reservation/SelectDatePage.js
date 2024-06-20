import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Review = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    예약신청서
                    <div></div>
                </div>
                <div className='review-mid'>
                </div>
            </div>
            <div className='Nbutton' onClick={() => navigate('/reservation')}>예약등록</div>
        </div>
    );
};

export default Review;
