import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookTicket.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:5000/api/v1/booking/all-bookings")
      .then((res) => setBookings(res.data.bookings || []))
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await axios.delete(
        `https://backend-event-zlss.onrender.com/api/v1/booking/delete-booking/${id}`
      );

      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">📊 Booking Dashboard</h2>

      {bookings.length === 0 ? (
        <p className="empty">No bookings available</p>
      ) : (
        <div className="card-grid">
          {bookings.map((b) => (
            <div key={b._id} className="card">

              <div className="card-header">
                <h3>{b.eventName || "Event Deleted"}</h3>
                <span className="price">₹{b.totalPrice}</span>
              </div>

              <div className="card-body">
                <p><strong>👤</strong> {b.userName}</p>
                <p><strong>📞</strong> {b.mobile}</p>
                <p><strong>📧</strong> {b.email}</p>
                <p><strong>🎟</strong> {b.tickets} Tickets</p>
              </div>

              <div className="card-footer">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
