import React, { useState } from 'react';
import './components.css';
import '../../font.css';
import EventTags from './EventTags';  // EventTags 컴포넌트를 임포트합니다.

const CommunityList = () => {
    const [listEvents, setListEvents] = useState([
        {
            id: 1,
            tags: ['강아지', '고양이'],
            title: '제목이 들어가는 텍스트 박스',
            content: '내용이 들어가는 텍스트 박스 본문이 들어가는 곳',
            timeAgo: '1시간 전',
            views: 100,
            comments: 5
        },
        {
            id: 2,
            tags: ['고양이'],
            title: '제목2',
            content: '내용2',
            timeAgo: '2시간 전',
            views: 200,
            comments: 10
        },
        // 다른 리스트 이벤트들 추가 가능
    ]);

    return (
        <div>
            {listEvents.map(event => (
                <div className='list-container' key={event.id}>
                    <div className='image-container'></div>
                    <div className='text-container'>
                        <EventTags tags={event.tags} views={event.views} />
                        <div className='title-container'>
                            <div className='title'>{event.title}</div>
                            <div className='content'>{event.content}</div>
                        </div>
                        <div className='info'>
                            <span>{event.timeAgo}</span>
                            &nbsp;·&nbsp;
                            <span>조회수 {event.views}</span>
                            &nbsp;·&nbsp;
                            <span>댓글 {event.comments}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommunityList;
