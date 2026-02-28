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
    HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Help() {

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

                    <h2 className="text-3xl font-bold">
                        Help & Support Center 🛟
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Need assistance? Find answers to common questions or contact support.
                    </p>

                    {/* FAQ Section */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

                        <div className="space-y-4 text-gray-700">

                            <div>
                                <h4 className="font-semibold">How to add a new student?</h4>
                                <p className="text-sm text-gray-600">
                                    Go to Student Profile → Click on "Add Student" → Fill the form and submit.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">How to mark attendance?</h4>
                                <p className="text-sm text-gray-600">
                                    Navigate to Attendance section → Select class → Mark present/absent → Save.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold">How to create a classroom?</h4>
                                <p className="text-sm text-gray-600">
                                    Open Classroom tab → Click "Create Classroom" → Enter details → Save.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Contact Support */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-4">Contact Support</h3>

                        <p className="text-gray-600 mb-4">
                            If your issue is not resolved, contact the system administrator.
                        </p>

                        <div className="space-y-2 text-gray-700">
                            <p>📧 Email: support@educonnect.com</p>
                            <p>📞 Phone: +91 98765 43210</p>
                            <p>🕒 Support Hours: 9:00 AM – 5:00 PM</p>
                        </div>
                    </div>

                    {/* System Info */}
                    <div className="mt-8 bg-indigo-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-indigo-700">
                            System Information
                        </h3>

                        <p className="text-sm text-indigo-600 mt-2">
                            Version: 1.0.0 <br />
                            Project Name: EduPilot Pro <br />
                            Developed for Teacher Management System
                        </p>
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