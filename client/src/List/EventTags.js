import React from 'react';

const EventTags = ({ tags, views }) => {
    const eventTags = views >= 100 ? [...tags] : tags;

    return (
        <div className='list-tag-container'>
            {eventTags.map(tag => (
                <div key={tag} className='list-tag'>
                    {tag}
                </div>
            ))}
        </div>
    );
};

export default EventTags;
