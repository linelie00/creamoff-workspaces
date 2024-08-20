import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/page.css';
import './styles/main.css';
import './Fonts/font.css';
import Login from './Page/Auth/LoginPage';
import FindIDPW from './Page/Auth/FindIDPW';
import AdminMenu from './Page/Main/MenuPage';
import Register from './Page/Main/Register';
import ImgUpload from './Page/Main/ImgUpload';
import ReservationManagement from './Page/Main/ReservationManagementPage';

import { ImageProvider } from './Contexts/ImageContext';
function App() {
  const [imageFiles, setImageFiles] = useState({
    main: [],
    sub: [],
    album: [],
    review: [],
    pricing: [],
  });

  const handleSetImageFiles = (imageType, files) => {
    setImageFiles((prevFiles) => ({
      ...prevFiles,
      [imageType]: files,
    }));
  };

  return (
    <div className="App">
          <div className="Container">
          <ImageProvider>
            <Router>
              <Routes>
                <Route path="/adminlogin" element={<Login />} />
                <Route path="/register" element={<Register imageFiles={imageFiles} />} />
                <Route path="/imgupload/:imageType" element={<ImgUpload setImageFiles={handleSetImageFiles} />} />
                <Route path="/find-admin-account" element={<FindIDPW />} />
                <Route path="/admin-menu" element={<AdminMenu />} />
                <Route path="/reservation-management" element={<ReservationManagement />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
            </ImageProvider> 
          </div>
        </div>
  );
}

export default App;
