import { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username:"",
    password:""
  });

  const submit = async ()=>{
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/teacher/login/",
      form
    );

    if(res.data.msg==="Login Success"){

      // 👉 SAVE TEACHER
      localStorage.setItem(
        "teacher",
        JSON.stringify(res.data.teacher || form)
      );

      alert("Login Success ✅");
      navigate("/dashboard");
    }

  } catch (err:any) {

    if(err.response?.data?.error==="User not found")
      alert("Username galat hai ❌");

    else if(err.response?.data?.error==="Wrong password")
      alert("Password galat hai ❌");

    else
      alert("Invalid Login ❌");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 animate-fadeIn">

        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Teacher Login
        </h2>

        <div className="input-box">
          <User className="mr-2"/>
          <input placeholder="Username"
            onChange={e=>setForm({...form,username:e.target.value})}/>
        </div>

        <div className="input-box mt-3">
          <Lock className="mr-2"/>
          <input type="password" placeholder="Password"
            onChange={e=>setForm({...form,password:e.target.value})}/>
        </div>

        <button onClick={submit} className="btn-primary mt-5">
          Login
        </button>

        <p className="text-center mt-3">
          New Teacher?
          <span
            className="text-indigo-600 cursor-pointer ml-1"
            onClick={()=>navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
}