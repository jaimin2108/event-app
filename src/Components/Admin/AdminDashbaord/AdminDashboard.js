import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    contacts: 0,
  });

  const getStats = async () => {
    try {
      const token = localStorage.getItem("admintoken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const res = await axios.get(
        "https://backend-event-zlss.onrender.com/api/v1/admin/dashboard", // ✅ FIXED
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStats(res.data.stats);
      }

    } catch (error) {
      console.log(error);
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    getStats();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <p>Users: {stats.users}</p>
      <p>Events: {stats.events}</p>
      <p>Contacts: {stats.contacts}</p>
    </div>
  );
};

export default AdminDashboard;