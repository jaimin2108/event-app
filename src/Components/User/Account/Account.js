import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import axios from "axios";
import Cookies from "js-cookie";
import { FaHome, FaUser, FaEnvelope, FaPhone, FaVenusMars } from "react-icons/fa";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });

  // ================= FETCH USER =================
  const fetchUser = useCallback(async () => {
    try {
      const userId = Cookies.get("userId");
      const token = Cookies.get("accessToken");

      // 🔥 If not logged in
      if (!userId || !token) {
        navigate("/login");
        return;
      }

      // 🔥 CORRECT API
      const res = await axios.get(
        `https://backend-event-zlss.onrender.com/api/v1/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("USER RESPONSE 👉", res.data); // Debug

      // 🔥 SET USER DATA
      setUser({
        name: res.data.user?.name || "",
        email: res.data.user?.email || "",
        gender: res.data.user?.gender || "",
        phone: res.data.user?.mobile_number || "",
      });

    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    }
  }, [navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="account-page">
      <div className="account-card">

        {/* HEADER */}
        <div className="account-header">🔥 Account Details</div>

        {/* NAV */}
        <div className="account-nav">
          <div className="nav-left" onClick={() => navigate("/")}>
            <FaHome /> HOME
          </div>

          <div className="nav-right">
            <span onClick={() => navigate("/changepassword")}>
              CHANGE PASSWORD
            </span>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="profile-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
          />
        </div>

        {/* DETAILS */}
        <div className="details-section">
          <h3 className="details-title">User Details</h3>

          <div className="detail-row">
            <FaUser />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="detail-row">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="detail-row">
            <FaVenusMars />
            <input
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="detail-row">
            <FaPhone />
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        {/* EDIT BUTTON */}
        <span
          style={{ cursor: "pointer", color: "#7b2cbf", fontWeight: "bold" }}
          onClick={() => navigate("/edituser")}
        >
          Change User Detail
        </span>

      </div>
    </div>
  );
}

export default Account;