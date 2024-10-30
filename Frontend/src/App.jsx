import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MoodMeter from "./pages/MoodMeter/MoodMeter";
import Therapy from "./pages/Therapy/Therapy";
import Chat from "./pages/Chat/Chat";
import Dashboard from "./pages/Dashboard/Dashboard";
import Chatbot from "./chat";
import VultrChatbot from "./vultrbot";
import Profile from "./pages/Profile/Profile";
import "./index.css";
import TherapistProfile from "./components/profile/therapistProfile";
import UserProfile from "./components/profile/userProfile";
import HealthMetrics from "./components/profile/healthmetrics";
const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/moodmeter" element={<MoodMeter />} />
      <Route path="/therapy" element={<Therapy />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/x" element={<HealthMetrics />} />
    </Routes>
    </>
  );
};

export default App;
