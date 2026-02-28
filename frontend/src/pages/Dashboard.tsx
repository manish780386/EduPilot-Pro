import { useState } from "react";
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

export default function Dashboard() {

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
                {/* BODY */}
                <div className="p-10 animate-fadeIn">

                    {/* Welcome */}
                    <h2 className="text-3xl font-bold">
                        Welcome {teacher?.username || "Teacher"} 👋
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Manage Students • Attendance • Classroom Easily
                    </p>

                    {/* STATS CARDS */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500">Total Students</h3>
                            <p className="text-2xl font-bold text-indigo-600">120</p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500">Today Attendance</h3>
                            <p className="text-2xl font-bold text-green-600">95%</p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="text-gray-500">Classes Today</h3>
                            <p className="text-2xl font-bold text-pink-600">5</p>
                        </div>

                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="mt-10">
                        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

                        <div className="flex flex-wrap gap-4">

                            <div className="flex flex-wrap gap-4">

                                <Link
                                    to="/students"
                                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-700">
                                    Add Student
                                </Link>

                                <Link
                                    to="/attendance"
                                    className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700">
                                    Mark Attendance
                                </Link>

                                <Link
                                    to="/classroom"
                                    className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700">
                                    Create Classroom
                                </Link>


                            </div>

                        </div>
                    </div>

                    {/* RECENT ACTIVITY */}
                    <div className="mt-10 bg-white p-5 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-3">Recent Activity</h3>

                        <ul className="text-gray-600 space-y-2">
                            <li>✔ Rahul marked present</li>
                            <li>✔ New student Priya added</li>
                            <li>✔ Math classroom updated</li>
                        </ul>
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