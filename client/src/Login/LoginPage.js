import '../styles/auth.css';

const LoginPage = () => {
    const logoUrl = `${process.env.PUBLIC_URL}/images/auth/logo.svg`;
    const googleUrl = `${process.env.PUBLIC_URL}/images/auth/google logo.svg`;
    const kakaoUrl = `${process.env.PUBLIC_URL}/images/auth/KAKAO logo.svg`;
    const naverUrl = `${process.env.PUBLIC_URL}/images/auth/Naver logo.svg`;
    return (
      <div className='login'>
          <div className="title">
                <img src={logoUrl} alt="logo" />
          </div>
          <div className="login-pictures">

          </div>
          <div className="login-text">
                우리 아이를 위한 특별한 곳,<br></br>
                여기에서 시작해요
          </div>
          <div className="login-button-container">
                <button>
                    <img src={googleUrl} alt="google" />
                </button>
                <button>
                    <img src={kakaoUrl} alt="kakao" />
                </button>
                <button>
                    <img src={naverUrl} alt="naver" />
                </button>
          </div>
          <a>간편로그인</a>
      </div>
    );
  };
  
  export default LoginPage;