import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleClickReview = (id) => {
        navigate(`/events/${id}/review`);
    };

    return (
        <div>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    알림장 상세보기
                </div>
                <div className='review-mid'>
                    <div className='view-head'>
                        <div className='view-head-textbox'>
                            <h1>알림장</h1>
                            <p>2024.04.28</p>
                        </div>
                        <div className='view-head-name'>
                            <p>한라마운틴미용실</p>
                        </div>
                    </div>
                    <div className='view-pet'>
                        누렁이
                    </div>
                </div>  
            </div>
            <div className='Nbutton' onClick={() => handleClickReview(id)}>후기 쓰러가기!</div>
        </div>
    );
};

export default ViewDetails;