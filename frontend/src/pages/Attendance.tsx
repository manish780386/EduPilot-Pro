
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
import { useState, useEffect } from "react";
import api from "../utils/api.ts";


interface Student {
    id: number;
    name: string;
    roll_no: string;
}

interface Classroom {
    id: number;
    name: string;
}

interface Subject {
    id: number;
    name: string;
}

interface AttendanceRecord {
    id: number;
    student: Student;
    classroom: Classroom;
    subject: Subject | null;
    date: string;
    status: string;
}


export default function Attendance() {

    const [students, setStudents] = useState<Student[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);

    const [selectedClassroom, setSelectedClassroom] = useState<number | "">("");
    const [selectedSubject, setSelectedSubject] = useState<number | "">("");
    const [selectedDate, setSelectedDate] = useState<string>("");

    const [statusMap, setStatusMap] = useState<Record<number, string>>({});

    // ✅ Fetch initial data
    useEffect(() => {
        fetchStudents();
        fetchClassrooms();
        fetchSubjects();
    }, []);

    const fetchStudents = async () => {
        const res = await api.get("students/");
        setStudents(res.data);
    };

    const fetchClassrooms = async () => {
        const res = await api.get("classrooms/");
        setClassrooms(res.data);
    };

    const fetchSubjects = async () => {
        const res = await api.get("subjects/");
        setSubjects(res.data);
    };

    const fetchAttendance = async () => {
        if (!selectedClassroom || !selectedDate) {
            alert("Select classroom and date");
            return;
        }
        const res = await api.get(
            `attendance/?classroom=${selectedClassroom}&date=${selectedDate}`
        );
        setAttendanceList(res.data);

        // Initialize statusMap
        const map: Record<number, string> = {};
        res.data.forEach((item: AttendanceRecord) => {
            map[item.student.id] = item.status;
        });
        setStatusMap(map);
    };

    const handleStatusChange = (studentId: number, value: string) => {
        setStatusMap({ ...statusMap, [studentId]: value });
    };

    const saveAttendance = async () => {
        if (!selectedClassroom || !selectedDate) {
            alert("Select classroom and date");
            return;
        }

        try {
            for (let student of students) {
                const payload = {
                    student: student.id,
                    classroom: selectedClassroom,
                    subject: selectedSubject || null,
                    date: selectedDate,
                    status: statusMap[student.id] || "Absent",
                };
                await api.post("attendance/", payload);
            }
            alert("Attendance saved ✅");
            fetchAttendance();
        } catch (err) {
            alert("Error saving attendance ❌");
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
                    <h2 className="text-3xl font-bold mb-5">Attendance Page</h2>
                    <div className="flex flex-wrap gap-4 mb-5 items-center bg-gray-100 p-4 rounded">

                        {/* Classroom Dropdown */}
                        <select
                            className="border border-gray-300 bg-white text-gray-900 text-sm p-2 pr-8 rounded w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                            value={selectedClassroom ?? ""}
                            onChange={(e) => setSelectedClassroom(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">Select Classroom</option>
                            {classrooms.map((c) => (
                                <option key={c.id} value={String(c.id)}>{c.name}</option>
                            ))}
                        </select>

                        {/* Subject Dropdown */}
                        <select
                            className="border border-gray-300 bg-white text-gray-900 text-sm p-2 pr-8 rounded w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                            value={selectedSubject ?? ""}
                            onChange={(e) => setSelectedSubject(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="">Select Subject (optional)</option>
                            {subjects.map((s) => (
                                <option key={s.id} value={String(s.id)}>{s.name}</option>
                            ))}
                        </select>

                        {/* Date Input */}
                        <input
                            type="date"
                            className="border border-gray-300 bg-white text-gray-900 text-sm p-2 rounded w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={selectedDate ?? ""}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />

                        {/* Load Attendance Button */}
                        <button
                            className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded shadow hover:bg-indigo-700 active:bg-indigo-800 transition duration-200 cursor-pointer"
                            onClick={fetchAttendance}
                        >
                            Load Attendance
                        </button>

                    </div>

                    {/* Attendance Table */}
                    <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border p-2 text-left">Roll No</th>
                                    <th className="border p-2 text-left">Name</th>
                                    <th className="border p-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="border p-2">{student.roll_no}</td>
                                        <td className="border p-2">{student.name}</td>
                                        <td className="border p-2">
                                            <select
                                                className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                                                value={statusMap[student.id] || "Absent"}
                                                onChange={(e) => handleStatusChange(student.id, e.target.value)}
                                            >
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={saveAttendance}
                        className="mt-5 bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition duration-200"
                    >
                        Save Attendance
                    </button>
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