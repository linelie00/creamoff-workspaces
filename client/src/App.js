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
import EditAdressPage from './EditUser/EditAddressPage';
import MyPage from './MyPage/MyPage';
import SavedPage from './MyPage/SavedPage';
import EventDetailPage from './List/EventDetailPage'; 
import LoginPage from './Login/LoginPage';
import KoginSuccess from './Login/LoginSuccessPage';
import Redirection from './Login/Redirection';
import PetListPage from './Pet/PetListPage';
import PetSelectPage from './Pet/PetSelectPage';
import PetRegistrationPage from './Pet/PetRegistrationPage';
import PetDetailPage from './Pet/PetDetailPage';
import PetEditPage from './Pet/PetEditPage';
import ReservationRequestPage from './Reservation/ReservationRequestPage';
import SelectDatePage from './Reservation/SelectDatePage';
import ReservatinConfirm from './Reservation/ReservationConfirmPage';
import ReservationPage from './Reservation/ReservationPage';
import CancleReservationPage from './Reservation/CancleReservationPage';
import UploadPage from './File/UploadPage';
import './App.css';
import './styles/components.css';
import PrivateRoute from './Components/PrivateRoute';

function App() {
    return (
        <div className="App">
          <div className="Container">
            <Router>
              <Routes>
                {/* 로그인 페이지는 보호되지 않은 라우트 */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/auth/*" element={<Redirection/>} />
                <Route path="/login-success" element={<KoginSuccess/>} />

                {/* 로그인이 필요한 페이지는 모두 PrivateRoute로 보호 */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/list/:id" element={<PrivateRoute element={ListPage} />} />
                <Route path="/community" element={<PrivateRoute element={CommunityPage} />} />
                <Route path="/edit-user" element={<PrivateRoute element={EditUserPage} />} />
                <Route path="/my-page" element={<PrivateRoute element={MyPage} />} />
                <Route path="/list-map/:id" element={<PrivateRoute element={ListMapPage} />} />
                <Route path="/events/:id" element={<PrivateRoute element={EventDetailPage} />} />
                <Route path="/pet-list" element={<PrivateRoute element={PetListPage} />} />
                <Route path="/notice" element={<PrivateRoute element={NoticePage} />} />
                <Route path="/events/:id/review" element={<PrivateRoute element={ReviewPage} />} />
                <Route path="/events/:id/view-details" element={<PrivateRoute element={ViewDetailsPage} />} />
                <Route path="/pet-select/:id" element={<PrivateRoute element={PetSelectPage} />} />
                <Route path="/reservation-request/:id" element={<PrivateRoute element={ReservationRequestPage} />} />
                <Route path="/select-date" element={<PrivateRoute element={SelectDatePage} />} />
                <Route path="/reservation-confirm" element={<PrivateRoute element={ReservatinConfirm} />} />
                <Route path="/reservation" element={<PrivateRoute element={ReservationPage} />} />
                <Route path="/cancle-reservation" element={<PrivateRoute element={CancleReservationPage} />} />
                <Route path="/pet-registration" element={<PrivateRoute element={PetRegistrationPage} />} />
                <Route path="/saved" element={<PrivateRoute element={SavedPage} />} />
                <Route path="/edit-address" element={<PrivateRoute element={EditAdressPage} />} />
                <Route path="/upload" element={<PrivateRoute element={UploadPage} />} />
                <Route path="/pet-detail/:id" element={<PrivateRoute element={PetDetailPage} />} />
                <Route path="/pet-edit/:id" element={<PrivateRoute element={PetEditPage} />} />
                {/* 추가 라우트도 PrivateRoute로 보호 */}
              </Routes>
            </Router>
          </div>
        </div>
    );
}

export default App;