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

export default function Timetable() {

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
                    <h2 className="text-3xl font-bold">
                        this time table page
                    </h2>
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