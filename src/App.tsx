import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { LifeCourseExperts } from './pages/LifeCourseExperts';
import { Dashboard } from './pages/Dashboard';
import { Live } from './pages/Live';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DoctorProfile } from './pages/DoctorProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/experts" element={<LifeCourseExperts />} />
        <Route path="/live" element={<Live />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<DoctorProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;