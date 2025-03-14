import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { LifeCourseExperts } from "./pages/LifeCourseExperts";
import { Dashboard } from "./pages/Dashboard";
import { Live } from "./pages/Live";
import { Community } from "./components/Community/Community";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DoctorProfile } from "./pages/DoctorProfile";
import { Trackers } from "./pages/Trackers";
import { BP } from "./pages/Trackers/BP";
import { Weight } from "./pages/Trackers/Weight";
import { SpO2 } from "./pages/Trackers/SpO2";
import { HeartRate } from "./pages/Trackers/HeartRate";
import { BloodGlucose } from "./pages/Trackers/BloodGlucose";
import { Anemia } from "./pages/Trackers/Anemia";
import { VideosPage } from "./pages/VideosPage";
import CoursesPage from "./pages/Courses";
import AuthGuard from "./components/AuthGuard";
import { MilestoneChecklist } from "./pages/Trackers/MileStoneCheckList";
import { MilestoneSummary } from "./pages/MilestoneTrackers/MilestoneSummary"
import Nutrition from "./pages/MilestoneTrackers/Nutrition";
import ExpertTipsGuidance from "./pages/MilestoneTrackers/ExpertTipsGuidance";
import FAQ from "./pages/MilestoneTrackers/FAQ";
// import { CommunityIntro } from "./components/Community/CommunityIntro";
// import GroupsList from "./components/Community/GroupsList";


const ProtectedRoutes = () => (
  <AuthGuard>
    <Outlet />
  </AuthGuard>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Default Route Redirects to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔹 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔹 Protected Routes (Requires Authentication) */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/experts" element={<LifeCourseExperts />} />
          <Route path="/live" element={<Live />} />
          <Route path="/community/*" element={<Community />} />
          {/* <Route path="/community/community-intro" element={<CommunityIntro />} />
          <Route index element={<CommunityIntro />} /> */}
          {/* <Route path="groups" element={<GroupsList />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<DoctorProfile />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/courses" element={<CoursesPage />} />

          {/* 🔹 Health Trackers Section */}
          <Route path="/trackers/*" element={<Outlet />}>
            <Route index element={<Trackers />} />
            <Route path="bp" element={<BP />} />
            <Route path="weight" element={<Weight />} />
            <Route path="spo2" element={<SpO2 />} />
            <Route path="heart-rate" element={<HeartRate />} />
            <Route path="blood-glucose" element={<BloodGlucose />} />
            <Route path="anemia" element={<Anemia />} />
            <Route path="milestone-checklist" element={<MilestoneChecklist />} />
            <Route path="milestone-summary" element={<MilestoneSummary />} />
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="expert-tips-guidance" element={<ExpertTipsGuidance />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Route>

        {/* 🔹 Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
