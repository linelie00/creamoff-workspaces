import React from "react";
import "./landing.css";
const Landing = () => {
  return (
    <div className="landing">
      <img className="pc" src="/landing/pc1.png" alt="" />
      <img className="pc" src="/landing/pc2.png" alt="" />
      <img className="pc" src="/landing/pc3.png" alt="" />
      <img className="pc" src="/landing/pc4.png" alt="" />
      <img className="pc" src="/landing/pc5.png" alt="" />
      <img className="mobile" src="/landing/Mobile1.png" alt="" />
      <img className="mobile" src="/landing/Mobile2.png" alt="" />
      <img className="mobile" src="/landing/Mobile3.png" alt="" />
      <img className="mobile" src="/landing/Mobile4.png" alt="" />
      <img className="mobile" src="/landing/Mobile5.png" alt="" />

      <button>
        앱 다운로드
        <img src="/landing/icon.png" alt="" />
      </button>
    </div>
  );
};

export default Landing;
