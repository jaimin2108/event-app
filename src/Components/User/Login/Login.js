import React, { useState } from "react";
import "./Login.css";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= HANDLE LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/user/login",
        formData
      );

      console.log("LOGIN RESPONSE 👉", res.data);

      const { token, user } = res.data;

      // ❌ Safety check
      if (!user || !token) {
        alert("Invalid login response ❌");
        return;
      }

      // ✅ STORE DATA
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Cookies.set("accessToken", token);
      Cookies.set("userId", user._id);

      // 🔥 UPDATE NAVBAR INSTANTLY
      window.dispatchEvent(new Event("storage"));

      alert("Login Successful ✅");

      navigate("/");

    } catch (error) {
      console.log("ERROR 👉", error.response?.data);

      // 🔥 BLOCK USER HANDLE
      if (error.response?.status === 403) {
        alert("🚫 Your account is blocked. Contact admin.");
      } 
      // 🔥 USER NOT FOUND
      else if (error.response?.status === 404) {
        alert("User not found ❌");
      } 
      // 🔥 WRONG PASSWORD
      else if (error.response?.status === 400) {
        alert("Invalid password ❌");
      } 
      // 🔥 OTHER ERROR
      else {
        alert(error.response?.data?.message || "Login failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-box" onSubmit={handleSubmit}>
        
        {/* ICON */}
        <div className="signin-icon">
          <FaLock size={35} color="#7b2cbf" />
        </div>

        {/* TITLE */}
        <h3 className="signin-title">Login</h3>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          className="signin-input"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          className="signin-input"
          placeholder="Password*"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* BUTTON */}
        <button className="signin-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>

        {/* REGISTER LINK */}
        <p className="register-link">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "#7b2cbf", fontWeight: "bold" }}
          >
            Register
          </span>
        </p>

      </form>
    </div>
  );
}

export default Login;