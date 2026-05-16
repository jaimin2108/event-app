import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Bookticket.css";

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);

  if (!data) {
    return <h2>❌ Invalid access</h2>;
  }

  // 🔥 SAFE PRICE FIX
  const price = Number(data.price) || 0;
  const ticketCount = Number(tickets) || 1;

  const totalPrice = price * ticketCount;

  const eventName = data.title || "Event";

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      eventDetail: id,
      eventName,
      userName,
      mobile,
      email,
      tickets: ticketCount,
      totalPrice: totalPrice, // 🔥 ALWAYS NUMBER
    };

    console.log("BOOKING DATA 👉", bookingData);

    navigate("/payment", { state: bookingData });
  };

  return (
    <div className="booking-page">
      <h2>🎟 Book Ticket</h2>

      <h3>{eventName}</h3>
      <p>Price: ₹{price}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <input
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
        />

        <h3>Total: ₹{totalPrice}</h3>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookTicket;