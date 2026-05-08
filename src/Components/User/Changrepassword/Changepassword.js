import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Changepassword.css";

function Changepassword() {

  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    mobile_number: "",
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const id = Cookies.get("userId");
  
  if (id) {
    setUserId(id);
    fetchUser(id);
  }
}, []);

  const fetchUser = async (id) => {
    try {
      const res = await axios.get(
        `https://backend-event-zlss.onrender.com/api/v1/user/getCurrentuser/${id}`
      );

      const user = res.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        mobile_number: user.mobile_number || "",
        currentPassword: "",
        newPassword: ""
      });
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.patch(
        `https://backend-event-zlss.onrender.com/api/v1/user/update/${userId}`,
        formData
      );

      alert(response.data.message);

      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: ""
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>
    </div>
  );
}

export default Changepassword;
