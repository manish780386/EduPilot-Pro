import { useState, useEffect } from "react";
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

import api from "../utils/api";




export default function StudentProfile() {

    const emptyForm = {
        roll_no: "",
        name: "",
        father_name: "",
        mother_name: "",
        phone: "",
        email: "",
        age: "",
        gender: "",
        city: "",
        address: "",
        classroom: "",
        image: null
    };

    const [students, setStudents] = useState<any[]>([]);
    const [classrooms, setClassrooms] = useState<any[]>([]);
    const [form, setForm] = useState<any>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchStudents();
        fetchClassrooms();
    }, []);

    // ✅ Fetch students
    const fetchStudents = async () => {
        try {
            const res = await api.get("students/");
            setStudents(res.data);
        } catch (err) {
            console.error(err);
            alert("Error fetching students ❌");
        }
    };

    // ✅ Fetch classrooms
    const fetchClassrooms = async () => {
        try {
            const res = await api.get("classrooms/");
            setClassrooms(res.data);
        } catch (err) {
            console.error(err);
            alert("Error fetching classrooms ❌");
        }
    };

    // Handle input changes
    const handleChange = (e: any) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else if (e.target.name === "classroom") {
            setForm({ ...form, classroom: Number(e.target.value) });
        } else if (e.target.name === "age") {
            setForm({ ...form, age: Number(e.target.value) });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // ✅ Submit form (Add / Edit)
    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            formData.append("roll_no", form.roll_no);
            formData.append("name", form.name);
            formData.append("father_name", form.father_name);
            formData.append("mother_name", form.mother_name);
            formData.append("phone", form.phone);
            formData.append("email", form.email || "");
            formData.append("age", String(form.age));
            formData.append("gender", form.gender);
            formData.append("city", form.city);
            formData.append("address", form.address);

            if (form.classroom) {
                formData.append("classroom", String(form.classroom));
            }

            if (form.image) {
                formData.append("image", form.image);
            }

            if (editingId) {
                await api.put(`students/${editingId}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Student updated ✅");
            } else {
                await api.post("students/", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                alert("Student added ✅");
            }

            setForm(emptyForm);
            setEditingId(null);
            fetchStudents();

        } catch (err: any) {
            console.error(err.response?.data || err.message);
            alert("Error saving student ❌");
        }
    };

    // Edit student
    const handleEdit = (student: any) => {
        setForm({
            ...student,
            classroom: student.classroom?.id || "",
            image: null // don't prefill image
        });
        setEditingId(student.id);
    };

    // Delete student
    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this student?")) return;
        try {
            await api.delete(`students/${id}/`);
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Error deleting student ❌");
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
                <div className="p-10">

                    <h2 className="text-3xl font-bold mb-6">
                        Student Management 📚
                    </h2>

                    {/* FORM */}
                    <div className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-3 gap-4">

                        <input name="roll_no" value={form.roll_no} onChange={handleChange} placeholder="Roll No" className="input" />
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
                        <input name="father_name" value={form.father_name} onChange={handleChange} placeholder="Father Name" className="input" />
                        <input name="mother_name" value={form.mother_name} onChange={handleChange} placeholder="Mother Name" className="input" />
                        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
                        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
                        <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="input" />
                        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" className="input" />
                        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input" />
                        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />

                        <select name="classroom" value={form.classroom} onChange={handleChange} className="input">
                            <option value="">Select Classroom</option>
                            {classrooms.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.class_name} - {c.section}
                                </option>
                            ))}
                        </select>

                        <input type="file" name="image" onChange={handleChange} className="input" />

                        <button
                            onClick={handleSubmit}
                            className="bg-indigo-600 text-white py-2 rounded-lg col-span-3">
                            {editingId ? "Update Student" : "Add Student"}
                        </button>
                    </div>

                    {/* STUDENT TABLE */}
                    <div className="bg-white rounded-xl shadow overflow-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="p-2">Photo</th>
                                    <th>Name</th>
                                    <th>Roll</th>
                                    <th>Phone</th>
                                    <th>Class</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s: any) => (
                                    <tr key={s.id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">
                                            {s.image ?
                                                <img src={`http://127.0.0.1:8000${s.image}`} className="w-10 h-10 rounded-full" />
                                                :
                                                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                            }
                                        </td>
                                        <td>{s.name}</td>
                                        <td>{s.roll_no}</td>
                                        <td>{s.phone}</td>
                                        <td>{s.classroom?.class_name} {s.classroom?.section}</td>
                                        <td className="flex gap-2 p-2">
                                            <button onClick={() => handleEdit(s)} className="bg-green-500 text-white px-3 py-1 rounded">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                                Delete
                                            </button>
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