import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: ""
  });

  const submit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/teacher/register/",
        form
      );

      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      alert("Error in Register ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 animate-fadeIn">

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Teacher Register
        </h2>

        <input className="input" placeholder="Username"
          onChange={e=>setForm({...form,username:e.target.value})}/>

        <input className="input mt-3" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>

        <input className="input mt-3" placeholder="Mobile"
          onChange={e=>setForm({...form,mobile:e.target.value})}/>

        <input type="password" className="input mt-3" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>

        <button onClick={submit}
          className="btn-primary mt-5">
          Register
        </button>

        <p className="text-center mt-3">
          Already account?
          <span
            className="text-indigo-600 cursor-pointer ml-1"
            onClick={()=>navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}