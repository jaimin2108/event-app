// ================= LOGIN.JS =================

import React, {
  useState,
} from "react";

import "./Login.css";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import Cookies from "js-cookie";

function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ================= HANDLE LOGIN =================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await axios.post(
            "https://backend-event-zlss.onrender.com/api/v1/user/login",
            formData
          );

        console.log(
          "LOGIN RESPONSE 👉",
          res.data
        );

        // ================= GET DATA =================

        const token =
          res.data.token;

        const user =
          res.data.user;

        // ================= SAVE LOCAL STORAGE =================

        localStorage.setItem(
          "token",
          token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            user
          )
        );

        localStorage.setItem(
          "userId",
          user._id
        );

        // ================= SAVE COOKIES =================

        Cookies.set(
          "accessToken",
          token
        );

        Cookies.set(
          "userId",
          user._id
        );

        // ================= UPDATE NAVBAR =================

        window.dispatchEvent(
          new Event(
            "userChanged"
          )
        );

        // ================= NAVIGATE =================

        navigate("/");

      } catch (err) {

        console.log(
          "LOGIN ERROR 👉",
          err.response?.data ||
            err.message
        );

        alert(
          err.response?.data
            ?.message ||
            "Login Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="login-page">

      <div className="login-box">

        <h2>Login</h2>

        <form
          onSubmit={
            handleLogin
          }
        >

          {/* EMAIL */}

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          {/* PASSWORD */}

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "LOGIN"}
          </button>

        </form>

        {/* SIGNUP */}

        <p>

          Don't have account?{" "}

          <Link to="/signup">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;