import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      mobile_number: "",
      gender: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      mobile_number,
      gender,
    } = formData;

    // ================= VALIDATION =================

    if (
      !name ||
      !email ||
      !password ||
      !mobile_number ||
      !gender
    ) {
      toast.error(
        "All fields are required ❌"
      );
      return;
    }

    try {
      setLoading(true);

      console.log(
        "REGISTER DATA 👉",
        formData
      );

      // ================= API =================

      const res = await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/user/register",
        formData
      );

      console.log(
        "REGISTER RESPONSE 👉",
        res.data
      );

      // ================= SUCCESS =================

      if (res.data.success) {
        toast.success(
          "User Registered Successfully ✅",
          {
            position:
              "top-center",
            autoClose: 3000,
            theme: "colored",
          }
        );

        // CLEAR FORM
        setFormData({
          name: "",
          mobile_number: "",
          gender: "",
          email: "",
          password: "",
        });

        // REDIRECT TO LOGIN
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(
        "REGISTER ERROR 👉",
        error.response?.data ||
          error.message
      );

      toast.error(
        error.response?.data
          ?.message ||
          "Registration failed ❌",
        {
          position:
            "top-center",
          autoClose: 3000,
          theme: "colored",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="registrationform">

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          <h2>Register</h2>

          {/* ================= NAME ================= */}

          <div>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={
                handleChange
              }
              placeholder="Enter your name"
              required
            />
          </div>

          {/* ================= MOBILE ================= */}

          <div>
            <label>
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile_number"
              value={
                formData.mobile_number
              }
              onChange={
                handleChange
              }
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* ================= GENDER ================= */}

          <div>
            <label>Gender</label>

            <div className="gender-box">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={
                    formData.gender ===
                    "Male"
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={
                    formData.gender ===
                    "Female"
                  }
                  onChange={
                    handleChange
                  }
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={
                    formData.gender ===
                    "Other"
                  }
                  onChange={
                    handleChange
                  }
                />
                Other
              </label>

            </div>
          </div>

          {/* ================= EMAIL ================= */}

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={
                handleChange
              }
              placeholder="Enter email"
              required
            />
          </div>

          {/* ================= PASSWORD ================= */}

          <div>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              placeholder="Enter password"
              required
            />
          </div>

          {/* ================= BUTTON ================= */}

          <button type="submit">
            {loading
              ? "Registering..."
              : "Register"}
          </button>

          {/* ================= LOGIN LINK ================= */}

          <p className="login-link">

            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Login
            </span>

          </p>
        </form>
      </div>

      {/* ================= TOAST ================= */}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
};

export default Signup;