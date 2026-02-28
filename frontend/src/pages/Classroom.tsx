
import { useNavigate } from "react-router-dom";
import {
    User,
    Menu,
    X,
    LayoutDashboard,
    Users,
    ClipboardCheck,
    BookOpen,
    HelpCircle,
    Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import api from "../utils/api.ts";

interface Classroom {
    id: number;
    class_name: string;
    section: string;
    subjects: Subject[];
}

interface Subject {
    id: number;
    subject_name: string;
    classroom: number;
}


export default function Classroom() {

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [newClassroom, setNewClassroom] = useState({ class_name: "", section: "" });
  const [newSubject, setNewSubject] = useState({ subject_name: "", classroom: "" });

  // ✅ Fetch classrooms from backend
  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      const res = await api.get("classrooms/");
      setClassrooms(res.data);
    } catch (err) {
      alert("Error fetching classrooms ❌");
    }
  };

  // Add classroom
  const addClassroom = async () => {
    if (!newClassroom.class_name || !newClassroom.section) {
      alert("Enter class name and section");
      return;
    }
    try {
      await api.post("classrooms/", newClassroom);
      alert("Classroom added ✅");
      setNewClassroom({ class_name: "", section: "" });
      fetchClassrooms();
    } catch {
      alert("Error adding classroom ❌");
    }
  };

  // Add subject
  const addSubject = async () => {
    if (!newSubject.subject_name || !newSubject.classroom) {
      alert("Enter subject name and select classroom");
      return;
    }
    try {
      await api.post("subjects/", {
        subject_name: newSubject.subject_name,
        classroom: newSubject.classroom
      });
      alert("Subject added ✅");
      setNewSubject({ subject_name: "", classroom: "" });
      fetchClassrooms();
    } catch {
      alert("Error adding subject ❌");
    }
  };


    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(true);

    // SAFE JSON PARSE
    let teacher: any = null;
    try {
        const data = localStorage.getItem("teacher");
        teacher = data ? JSON.parse(data) : null;
    } catch {
        teacher = null;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* ================= SIDEBAR ================= */}
            <div className={`bg-indigo-700 text-white p-5 transition-all duration-300
        ${openSidebar ? "w-64" : "w-16"}`}>

                <button
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="mb-6">
                    {openSidebar ? <X /> : <Menu />}
                </button>

                <ul className="space-y-4">

                    <Link to="/dashboard">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <LayoutDashboard /> {openSidebar && "Dashboard"}
                        </li>
                    </Link>

                    <Link to="/students">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <Users /> {openSidebar && "Student Profile"}
                        </li>
                    </Link>

                    <Link to="/attendance">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <ClipboardCheck /> {openSidebar && "Attendance"}
                        </li>
                    </Link>

                    <Link to="/classroom">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <BookOpen /> {openSidebar && "Classroom"}
                        </li>
                    </Link>

                    <Link to="/timetable">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <Calendar /> {openSidebar && "Schedule Timetable"}
                        </li>
                    </Link>

                    <Link to="/help">
                        <li className="flex gap-3 items-center hover:bg-indigo-600 p-2 rounded-lg cursor-pointer">
                            <HelpCircle /> {openSidebar && "Help"}
                        </li>
                    </Link>

                </ul>
            </div>

            {/* ================= MAIN AREA ================= */}
            <div className="flex-1">

                {/* NAVBAR */}
                <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">

                    <h1 className="text-xl font-bold">
                        EduPilot Pro
                    </h1>

                    <div className="flex gap-3 items-center">

                        {!teacher ? (
                            <>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-white text-indigo-600 px-3 py-1 rounded-lg">
                                    Login
                                </button>

                                <button
                                    onClick={() => navigate("/register")}
                                    className="bg-white text-indigo-600 px-3 py-1 rounded-lg">
                                    Register
                                </button>
                            </>
                        ) : (
                            <>
                                {/* USERNAME ONLY */}
                                <span className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-semibold">
                                    {teacher.username}
                                </span>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem("teacher");
                                        navigate("/");
                                    }}
                                    className="bg-red-500 px-3 py-1 rounded-lg">
                                    Logout
                                </button>

                                <User
                                    className="cursor-pointer hover:scale-110 transition"
                                    onClick={() => setShowProfile(true)}
                                />
                            </>
                        )}
                    </div>
                </nav>

                {/* BODY */}
                <div className="p-10 animate-fadeIn">
                    <h2 className="text-3xl font-bold mb-5">Classroom Management</h2>

                    {/* Add Classroom */}
                    <div className="mb-5 flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Class Name"
                            className="border p-2 rounded"
                            value={newClassroom.class_name}
                            onChange={(e) => setNewClassroom({ ...newClassroom, class_name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Section"
                            className="border p-2 rounded"
                            value={newClassroom.section}
                            onChange={(e) => setNewClassroom({ ...newClassroom, section: e.target.value })}
                        />
                        <button
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            onClick={addClassroom}
                        >
                            Add Classroom
                        </button>
                    </div>

                    {/* Add Subject */}
                    <div className="mb-5 flex gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Subject Name"
                            className="border p-2 rounded"
                            value={newSubject.subject_name}
                            onChange={(e) => setNewSubject({ ...newSubject, subject_name: e.target.value })}
                        />
                        <select
                            className="border p-2 rounded"
                            value={newSubject.classroom}
                            onChange={(e) => setNewSubject({ ...newSubject, classroom: e.target.value })}
                        >
                            <option value="">Select Classroom</option>
                            {classrooms.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.class_name} - {c.section}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={addSubject}
                        >
                            Add Subject
                        </button>
                    </div>

                    {/* Classroom Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2">Classroom</th>
                                    <th className="border p-2">Section</th>
                                    <th className="border p-2">Subjects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classrooms.map((c) => (
                                    <tr key={c.id}>
                                        <td className="border p-2">{c.class_name}</td>
                                        <td className="border p-2">{c.section}</td>
                                        <td className="border p-2">
                                            {c.subjects.length > 0 ? (
                                                <ul>
                                                    {c.subjects.map((s) => (
                                                        <li key={s.id}>{s.subject_name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>No Subjects</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* PROFILE MODAL */}
            {showProfile && teacher && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-xl w-80 shadow-2xl">

                        <h2 className="font-bold text-indigo-600 mb-3">
                            Teacher Profile
                        </h2>

                        <p><b>Username:</b> {teacher.username}</p>
                        <p><b>Email:</b> {teacher.email}</p>
                        <p><b>Mobile:</b> {teacher.mobile}</p>

                        <button
                            onClick={() => setShowProfile(false)}
                            className="bg-indigo-600 text-white w-full mt-4 py-2 rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}