import React, { useState, useEffect } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // axios import

const ListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [listEvents, setListEvents] = useState([]); // 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/images/list/map.svg`;

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  // API 호출
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/businesses`, {
          params: { category: id } // URL 파라미터로 ID 전달
        });

        setListEvents(response.data); // 가져온 데이터를 상태에 저장
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={goBack}/>
        </button>
        미용
        <div></div>
      </div>
      <div className={`list-header ${isDropdownOpen ? 'open' : ''}`}>
        <div className='list-header-i'>
          <div className='list-header-item' onClick={toggleDropdown}>
            거리 순
            <button>
              <img src={arrowUrl} alt='arrow'/>
            </button>
          </div>
          <button>
            <img src={mapUrl} alt='map' onClick={() => navigate('/list-map')}/>
          </button>
        </div>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <div className='dropdown-item'>평점 오름차 순</div>
            <div className='dropdown-item'>평점 내림차 순</div>
            <div className='dropdown-item'>가격 오름차 순</div>
            <div className='dropdown-item'>가격 내림차 순</div>
            <div className='dropdown-item'>쌓인 후기 오름차 순</div>
            <div className='dropdown-item'>쌓인 후기 내림차 순</div>
          </div>
        )}
      </div>
      <div className="list-mid-h">
        {/* List 컴포넌트에 데이터를 전달 */}
        <List listEvents={listEvents} />
      </div>
      <NButtonContainer />
    </div>
  );
};

export default ListPage;