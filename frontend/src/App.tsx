import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentProfile from "./pages/StudentProfile.tsx";
import Attendance from "./pages/Attendance.tsx";
import Classroom from "./pages/Classroom.tsx";
import Help from "./pages/Help.tsx";
import Timetable from "./pages/Timetable.tsx";
export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        
        <Route path="/" element={<Dashboard />} />

        
        <Route path="/login" element={<Login />} />

        
        <Route path="/register" element={<Register />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<StudentProfile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/help" element={<Help />} />

      </Routes>

    </BrowserRouter>
  );
}