import React from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';

const ListPage = () => {
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/images/list/map.svg`;

  return (
    <div>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt=''/>
        </button>
          미용
        </div>
        <div className='list-header'>
          <div className='list-header-item'>
            거리 순
            <button>
              <img src={arrowUrl} alt='arrow'/>
            </button>
          </div>
          <button>
            <img src={mapUrl} alt='arrow'/>
          </button>
        </div>
        <List />
        <NButtonContainer />
    </div>
  );
};

export default ListPage;