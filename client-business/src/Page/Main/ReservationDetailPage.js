import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css'
import '../../styles/reservation.css'

const ReservationDetails = () => {

  const navigate = useNavigate();
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

  const reservatioInfo = [
    { title: '보호자 연락처', info: '010-5659-9852' },
    { title: '반려동물 이름', info: '누렁이까망이하양이노랑이 파랑이' },
    { title: '반려동물 종', info: '피카츄전기과포켓몬토토로밤만보몬스' },
    { title: '몸무게', info: '6.87kg' },
    { title: '성별', info: '여' },
    { title: '나이', info: '5' },
    { title: '스타일', info: '1cm + 알머리컷' },
    { title: '추가사항', info: '목욕\n위생' },
    { title: '특이사항', info: '피부병\n심장질환\n마킹\n침흘림\n더아프면 유감' },
    { title: '주의사항', info: '우리개는 물어요\n조심하세요' }
  ];

  const formatInfo = (text) => {
    return text.split('\n').map((item, index) => (
      <React.Fragment key={index}>
        {item}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className='page-container2' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={()=>navigate('/reservation-management')} />
            </button>
            상세보기
            <div> </div>
        </div>
        <div className='detail-form1'>
            {reservatioInfo.map((item, index) => (
                <div key={index} className='detail-form2'>
                    <div className='detail-title'>{item.title}</div>
                    <div className='detail-info'>{formatInfo(item.info)}</div>
                </div>
            ))}
        </div>
        <div className='footer-button'>
            <button className='refuse-btn'>거절</button>
            <button className='accept-btn'>수락</button>
        </div>
    </div>
  );
};

export default ReservationDetails;