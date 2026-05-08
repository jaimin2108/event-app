import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FRONTEND VALIDATION
    if (!name || !email || !gender || !mobile_number || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        gender, // ✅ MUST BE: Male/Female/Other
        mobile_number: mobile_number.trim(),
        password,
      };

      console.log("Sending registration data 👉", payload);

      const res = await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/user/register",
        payload
      );

      console.log("SUCCESS 👉", res.data);

      toast.success(res.data.message);

      // ✅ CLEAR FORM
      setName("");
      setEmail("");
      setGender("");
      setMobileNumber("");
      setPassword("");

      // ✅ REDIRECT TO LOGIN
      navigate("/login");

    } catch (error) {
      console.log("ERROR 👉", error.response?.data || error.message);

      toast.error(
        error.response?.data?.message || "Registration failed ❌"
      );
    }
  };

  return (
    <>
      <div className="registrationform">
        <form onSubmit={handleSubmit} className="register-form">
          <h3>Registration Form</h3>

          {/* NAME */}
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* MOBILE */}
          <div>
            <label>Mobile Number</label>
            <input
              type="text"
              value={mobile_number}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* GENDER */}
          <div>
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                /> Male
              </label>

              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                /> Female
              </label>

              <label>
                <input
                  type="radio"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                /> Other
              </label>
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter strong password"
              required
            />
          </div>

          <button type="submit">Register</button>

          {/* 🔥 LOGIN LINK */}
          <p style={{ marginTop: "10px" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#7b2cbf", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Signup;