import React from 'react';
import './App.css';
import './styles/page.css';
import './styles/main.css';
import './Fonts/font.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/Auth/LoginPage';
import Register from './Page/Main/Register';

function App() {
  return (
    <div className="App">
          <div className="Container">
            <Router>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
          </div>
        </div>
  );
}

export default App;
