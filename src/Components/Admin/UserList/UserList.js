import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserList.css";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // ================= FETCH USERS =================
  const getUsers = async () => {
    try {
      const res = await axios.get("https://backend-event-zlss.onrender.com/api/v1/user/all");

      console.log("USERS 👉", res.data);

      if (res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      console.log(
        "Error fetching users:",
        error.response?.data || error.message
      );
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) return;

      const res = await axios.delete(
        `https://backend-event-zlss.onrender.com/api/v1/user/delete/${id}`
      );

      if (res.data.success) {
        alert(res.data.message);
        getUsers();
      }
    } catch (error) {
      console.log(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  // ================= BLOCK / UNBLOCK =================
  const toggleBlockUser = async (id) => {
    try {
      const res = await axios.put(
        `https://backend-event-zlss.onrender.com/api/v1/user/block/${id}`
      );

      if (res.data.success) {
        alert(res.data.message);
        getUsers();
      }
    } catch (error) {
      console.log(
        "Error blocking user:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ================= SAFE SEARCH FILTER =================
  const filteredUsers = users.filter((user) => {
    const name = user?.name ? user.name.toLowerCase() : "";
    const email = user?.email ? user.email.toLowerCase() : "";

    return (
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div className="userlist-container">
      <h2>User List</h2>

      {/* TOP SECTION */}
      <div className="userlist-top">
        <div className="total-users">
          Total Users: {filteredUsers.length}
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="user-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.mobile_number || "N/A"}</td>
                <td>{user.gender || "N/A"}</td>

                <td>
                  {user.isBlocked ? (
                    <span style={{ color: "red" }}>Blocked</span>
                  ) : (
                    <span style={{ color: "green" }}>Active</span>
                  )}
                </td>

                <td>
                  <button
                    className="block-btn"
                    onClick={() => toggleBlockUser(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;