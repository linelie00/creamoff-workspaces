import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;
    const keyButtonUrl = `${process.env.PUBLIC_URL}/images/icon/keyboard_return.svg`;

    const goBack = () => {
        navigate(-1); // 뒤로 가기
      };    

  return (
    <div className='mid' lang='ko'>
        <div className='navigation'>
            <button>
                <img src={arrowButtonUrl} alt='' onClick={goBack} />
            </button>
            등록자료 올리기
            <div>저장</div>
        </div>
        <div className='main-mid'>
            <div className='upload-box'>
                <p>메인사진(상세페이지 최상단 노출)</p>
                <p>jpg 해상도 430*468</p>
                <div>
                    <img src={keyButtonUrl} alt='' />
                    파일올리기
                </div>
            </div>
            <div className='upload-box'>
                <p>서브사진(로고 또는 가게 내외부 사진)</p>
                <p>jpg,png 해상도 430*430</p>
                <div>
                    <img src={keyButtonUrl} alt='' />
                    파일올리기
                </div>
            </div>
            <div className='upload-box'>
                <p>앨범사진(포트폴리오 or 게시할 사진)</p>
                <p>jpg 해상도 430*430</p>
                <div>
                    <img src={keyButtonUrl} alt='' />
                    파일올리기
                </div>
            </div>
            <div className='upload-box'>
                <p>후기사진(후기글은 .txt 파일로 업로드)</p>
                <p>해상도 430*430</p>
                <div>
                    <img src={keyButtonUrl} alt='' />
                    파일올리기
                </div>
            </div>
            <div className='upload-box'>
                <p>가격표</p>
                <p>엑셀,이미지,pdf,한글 파일 등</p>
                <div>
                    <img src={keyButtonUrl} alt='' />
                    파일올리기
                </div>
            </div>
            <div className='input-container'>
                <p>상호명</p>
                <input type='text' placeholder='상호명을 입력해 주세요.' />
            </div>
            <div className='input-container'>
                <p>주소</p>
                <input type='text' placeholder='주소를 입력해 주세요.' />
            </div>
        </div>
    </div>
  );
}

export default Register;