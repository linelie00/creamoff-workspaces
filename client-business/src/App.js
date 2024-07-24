import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Page/Auth/LoginPage';

function App() {
  return (
    <div className="App">
          <div className="Container">
            <Router>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
          </div>
        </div>
  );
}

export default App;
