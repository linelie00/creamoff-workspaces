import React from 'react';
import EventTags from './EventTags';

const Event = ({ event }) => {
    return (
        <div className='list-list-container' key={event.id}>
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