import React from 'react';
import EventTags from './EventTags';
import { useNavigate } from 'react-router-dom';

const Event = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div
            className='list-list-container'
            key={event.id}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <div className='list-image-container'>
                {/* 이미지 URL이 존재하는 경우에만 렌더링 */}
                {event.mainImage ? (
                    <img
                        src={event.mainImage}
                        alt={event.name}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // 스타일은 필요에 따라 조정
                    />
                ) : (
                    <div>No Image Available</div> // 이미지가 없는 경우 대체 텍스트
                )}
            </div>
            <div className='text-container'>
                <div className='list-title-container'>
                    <div className='list-title'>{event.name}</div>
                    <EventTags tags={event.tags} views='100' />
                    <div className='list-content'>{event.location}</div>
                </div>
            </div>
        </div>
    );
};

export default Event;