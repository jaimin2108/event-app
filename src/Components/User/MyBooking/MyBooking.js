import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBooking.css";

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://backend-event-zlss.onrender.com/api/v1/booking/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("BOOKINGS 👉", res.data);

      const data = res.data.bookings || res.data.data || [];

      setBookings(data);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDownload = (b) => {
    navigate("/download-ticket", { state: b });
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="mybooking">
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="booking-container">
          {bookings.map((b, i) => (
            <div className="booking-card" key={i}>
              <h3>{b.eventName}</h3>

              <p>Tickets: {b.tickets}</p>
              <p>Total: ₹{b.totalPrice}</p>

              <p>
                Date:{" "}
                {b.createdAt
                  ? new Date(b.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>

              <button onClick={() => handleDownload(b)}>
                Download Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;