import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Home } from './pages/Home';
import { LifeCourseExperts } from './pages/LifeCourseExperts';
import { Dashboard } from './pages/Dashboard';
import { Live } from './pages/Live';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { DoctorProfile } from './pages/DoctorProfile';
import { Trackers } from './pages/Trackers';
import { BP } from './pages/Trackers/BP';
import { Weight } from './pages/Trackers/Weight';
import { SpO2 } from './pages/Trackers/SpO2';
import { HeartRate } from './pages/Trackers/HeartRate';
import { BloodGlucose } from './pages/Trackers/BloodGlucose';
import { Anemia } from './pages/Trackers/Anemia';
import { VideosPage } from './pages/VideosPage';
import CoursesPage from './pages/Courses';
import AuthGuard from './components/AuthGuard';

function ProtectedRoutes() {
  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Redirect to Login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/experts" element={<LifeCourseExperts />} />
          <Route path="/live" element={<Live />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<DoctorProfile />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/courses" element={<CoursesPage />} />

          {/* 🔹 Health Trackers Section */}
          <Route path="/trackers" element={<Trackers />}>
            <Route path="bp" element={<BP />} />
            <Route path="weight" element={<Weight />} />
            <Route path="spo2" element={<SpO2 />} />
            <Route path="heart-rate" element={<HeartRate />} />
            <Route path="blood-glucose" element={<BloodGlucose />} />
            <Route path="anemia" element={<Anemia />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
