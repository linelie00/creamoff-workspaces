import React from 'react';

const EventTags = ({ tags, views }) => {
    const eventTags = views >= 100 ? [...tags] : tags;

    return (
        <div className='tag-container'>
            {eventTags.map(tag => (
                <div key={tag} className='tag'>
                    {tag}
                </div>
            ))}
        </div>
    );
};

export default EventTags;
