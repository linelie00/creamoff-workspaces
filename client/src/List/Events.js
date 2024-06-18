import React from 'react';
import EventTags from './EventTags';
import { useNavigate } from 'react-router-dom';

const Event = ({ event }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <div className='list-list-container' key={event.id} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='list-image-container'></div>
            <div className='text-container'>
                <div className='list-title-container'>
                    <div className='list-title'>{event.title}</div>
                    <EventTags tags={event.tags} views={event.views} />
                    <div className='list-content'>{event.content}</div>
                </div>
            </div>
        </div>
    );
};

export default Event;
