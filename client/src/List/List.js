import React, { useState } from 'react';
import Event from './Events';

const List = () => {
    const [listEvents, setListEvents] = useState([
        {
            id: 1,
            tags: ['대형견', '소형견', '특수미용'],
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
        },
        {
            id: 2,
            tags: ['대형견', '소형견', '특수미용'],
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
        },
        {
            id: 3,
            tags: ['대형견', '소형견', '특수미용'],
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
        },
        {
            id: 4,
            tags: ['대형견', '소형견', '특수미용'],
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
        },
        {
            id: 5,
            tags: ['대형견', '소형견', '특수미용'],
            title: '한라마운틴미용실',
            content: '제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담',
        }
        // 다른 리스트 이벤트들 추가 가능
    ]);

    return (
        <div className='list-mid'>
           {listEvents.map(event => (
                <Event key={event.id} event={event} />
            ))}
        </div>
    );
}

export default List;
