import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import NoticePage from './Notice/NoticePage';
import ReviewPage from './Notice/ReviewPage';
import ViewDetailsPage from './Notice/ViewDetailsPage';
import ListPage from './List/ListPage';
import ListMapPage from './List/ListMapPage';
import CommunityPage from './Community/CommunityPage';
import EditUserPage from './EditUser/EditUserPage';
import MyPage from './MyPage/MyPage';
import SavedPage from './MyPage/SavedPage';
import EventDetailPage from './List/EventDetailPage'; 
import LoginPage from './Login/LoginPage';
import KoginSuccess from './Login/LoginSuccessPage';
import Redirection from './Login/Redirection';
import PetListPage from './Pet/PetListPage';
import PetSelectPage from './Pet/PetSelectPage';
import PetRegistrationPage from './Pet/PetRegistrationPage';
import ReservationRequestPage from './Reservation/ReservationRequestPage';
import SelectDatePage from './Reservation/SelectDatePage';
import ReservatinConfirm from './Reservation/ReservationConfirmPage';
import ReservationPage from './Reservation/ReservationPage';
import CancleReservationPage from './Reservation/CancleReservationPage';
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
                <Route path="/notice" element={<NoticePage />} />
                <Route path="/events/:id/review" element={<ReviewPage />} />
                <Route path="/events/:id/view-details" element={<ViewDetailsPage />} />
                <Route path="/pet-select" element={<PetSelectPage />} />
                <Route path="/reservation-request" element={<ReservationRequestPage />} />
                <Route path="/select-date" element={<SelectDatePage />} />
                <Route path="/reservation-confirm" element={<ReservatinConfirm />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/cancle-reservation" element={<CancleReservationPage />} />
                <Route path="/pet-registration" element={<PetRegistrationPage />} />
                <Route path="/saved" element={<SavedPage />} />
                <Route path="/auth/kakao" element={<Redirection />} />
                <Route path="/login-success" element={<KoginSuccess />} />
                {/* 다른 라우트들 추가 */}
              </Routes>
            </Router>
          </div>
        </div>
    );
}

export default App;