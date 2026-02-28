import axios from "axios";

// ✅ Base axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django backend API base
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for requests/responses
// For example: attach auth token if you have login system
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;