import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css"

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/admin/login",
        formData
      );

      localStorage.setItem("admintoken", res.data.token);

      alert("Login Success ✅");
      window.location.href = "/admin/Admindashboard";

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <input type="email" name="email" onChange={handleChange} required />
      <input type="password" name="password" onChange={handleChange} required />

      <button type="submit">Login</button>
    </form>
  );
}

export default AdminLogin;