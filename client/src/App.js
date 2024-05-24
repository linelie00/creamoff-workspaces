import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Main/MainPage';
import ListPage from './List/ListPage';
import CommunityPage from './Community/CommunityPage';
import EditUserPage from './EditUser/EditUserPage';
import './App.css';

function App() {
    return (
        <div className="App">
          <div className="Container">
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/edit-user" element={<EditUserPage />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
          </div>
        </div>
    );
}

export default App;