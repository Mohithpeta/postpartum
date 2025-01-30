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
import { Trackers } from './pages/Trackers';
import { BP } from './pages/Trackers/BP';
import { Weight } from './pages/Trackers/Weight';
// import { SpO2 } from './pages/Trackers/SpO2';
// import { HeartRate } from './pages/Trackers/HeartRate';
import { BloodGlucose } from './pages/Trackers/BloodGlucose';
import { Anemia } from './pages/Trackers/Anemia';
import { VideosPage } from './pages/VideosPage';

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
        <Route path="/trackers" element={<Trackers />} />
        <Route path="/trackers/bp" element={<BP />} />
        <Route path="/trackers/weight" element={<Weight />} />
        {/* <Route path="/trackers/spo2" element={<SpO2 />} />
        <Route path="/trackers/heart-rate" element={<HeartRate />} /> */}
        <Route path="/trackers/blood-glucose" element={<BloodGlucose />} />
        <Route path="/trackers/anemia" element={<Anemia />} />
        <Route path="/videos" element={<VideosPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;