import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import ListPage from './List/ListPage';
import ListMapPage from './List/ListMapPage';
import CommunityPage from './Community/CommunityPage';
import EditUserPage from './EditUser/EditUserPage';
import MyPage from './MyPage/MyPage';
import EventDetailPage from './List/EventDetailPage'; 
import LoginPage from './Login/LoginPage';
import PetListPage from './List/PetListPage';
import './App.css';

function App() {
    return (
        <div className="App">
          <div className="Container">
            <Router>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/edit-user" element={<EditUserPage />} />
                <Route path="/my-page" element={<MyPage />} />
                <Route path="/list-map" element={<ListMapPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/pet-list" element={<PetListPage />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
          </div>
        </div>
    );
}

export default App;