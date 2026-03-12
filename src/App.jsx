import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import './App.css';

// Layout Components
import TopNavbar from './components/layout/TopNavbar';
import SOSButton from './components/layout/SOSButton';

// Page Components
import Landing from './pages/Landing/LandingPage';
import UserAuth from './pages/Auth/UserAuth';
import UserDashboard from './pages/Dashboard/UserDashboard';
import ConsultantRegistration from './pages/Consultant/ConsultantRegistration';
import Admin from './pages/Admin/AdminDashboard';
import SearchPage from './pages/Search/SearchPage';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import HospitalDetail from './pages/Hospital/HospitalDetail';
import PharmacyPage from './pages/Pharmacy/PharmacyPage';

// Constants
import { initialForums } from './constants/initialState';

/* ---------------- MAIN APP & STATE MANAGER ---------------- */
function App() {
  const [consultants, setConsultants] = useState(() => {
    const saved = localStorage.getItem("consultants");
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem("prescriptions");
    return saved ? JSON.parse(saved) : [
      { id: 999, userId: 101, consultantName: "Sarah Jenkins", diagnosis: "Generalized Anxiety", notes: "Patient making good progress. Continue CBT.", targets: [{ task: "15 min Guided Mindfulness", completed: false }, { task: "Journal daily triggers", completed: true }] }
    ];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("reviews");
    return saved ? JSON.parse(saved) : [];
  });

  const [forums, setForums] = useState(initialForums);

  const [authUser, setAuthUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  // Persist State
  useEffect(() => localStorage.setItem("consultants", JSON.stringify(consultants)), [consultants]);
  useEffect(() => localStorage.setItem("appointments", JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem("prescriptions", JSON.stringify(prescriptions)), [prescriptions]);
  useEffect(() => localStorage.setItem("reviews", JSON.stringify(reviews)), [reviews]);
  useEffect(() => localStorage.setItem("authUser", JSON.stringify(authUser)), [authUser]);

  return (
    <Router>
      <div className="klues-app-wrapper">
        <TopNavbar authUser={authUser} />
        <SOSButton />
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Search & Browse */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/hospital/:id" element={<HospitalDetail />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />

          {/* User Flows */}
          <Route path="/user" element={<UserAuth setAuthUser={setAuthUser} />} />
          <Route path="/user/dashboard" element={
            authUser ? <UserDashboard
              authUser={authUser}
              onLogout={() => { setAuthUser(null); window.location.href = "/"; }}
              consultants={consultants}
              appointments={appointments}
              setAppointments={setAppointments}
              prescriptions={prescriptions}
              forums={forums}
              setForums={setForums}
              reviews={reviews}
              setReviews={setReviews}
            /> : <Navigate to="/user" />
          } />

          {/* Consultant Flows */}
          <Route path="/consultant" element={<ConsultantRegistration consultants={consultants} setConsultants={setConsultants} />} />

          {/* Admin Flow */}
          <Route path="/admin" element={<Admin consultants={consultants} setConsultants={setConsultants} reviews={reviews} setReviews={setReviews} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
