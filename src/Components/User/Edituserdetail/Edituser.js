import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Edituser.css";

function EditUser() {

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

  // Fetch logged user from cookie
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
        `http://localhost:5000/api/v1/user/getCurrentuser/${id}`
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
        `http://localhost:5000/api/v1/user/update/${userId}`,
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

    <div className="edituser-container">

      <h2>Update Profile</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          name="mobile_number"
          placeholder="Enter Mobile Number"
          value={formData.mobile_number}
          onChange={handleChange}
        />

        <h3>Change Password</h3>

        <input
          type="password"
          name="currentPassword"
          placeholder="Enter Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>

    </div>

  );
}

export default EditUser;
