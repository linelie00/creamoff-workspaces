import '../styles/auth.css';

const LoginPage = () => {
    const logoUrl = `${process.env.PUBLIC_URL}/images/auth/logo.svg`;
    const googleUrl = `${process.env.PUBLIC_URL}/images/auth/google logo.svg`;
    const kakaoUrl = `${process.env.PUBLIC_URL}/images/auth/KAKAO logo.svg`;
    const naverUrl = `${process.env.PUBLIC_URL}/images/auth/Naver logo.svg`;
    const image1Url = `${process.env.PUBLIC_URL}/images/auth/pictures/img (1).png`;
    const image2Url = `${process.env.PUBLIC_URL}/images/auth/pictures/img (2).png`;
    const image3Url = `${process.env.PUBLIC_URL}/images/auth/pictures/img (3).png`;
    const image4Url = `${process.env.PUBLIC_URL}/images/auth/pictures/img (4).png`;
    const image5Url = `${process.env.PUBLIC_URL}/images/auth/pictures/img (5).png`;
    return (
      <div className='login'>
        <div className="login-title">
            <img src={logoUrl} alt="logo" />
        </div>
        <div className="login-pictures">
            <table>
                <tbody>
                <tr>
                    <td colSpan="2" rowSpan="2">
                    <img src={image1Url} alt="" />
                    </td>
                    <td rowSpan="2">
                    <img src={image2Url} alt="" />
                    </td>
                </tr>
                <tr></tr>
                <tr>
                    <td colSpan="2" rowSpan="2">
                    <img src={image3Url} alt="" />
                    </td>
                    <td>
                    <img src={image4Url} alt="" />
                    </td>
                </tr>
                <tr>
                    <td>
                    <img src={image5Url} alt="" />
                    </td>
                </tr>
                </tbody>
            </table>
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