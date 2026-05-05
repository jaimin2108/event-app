import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Bookticket.css";

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ GET USER PRICE DIRECTLY
  const price = location.state?.price || 0;
  const title = location.state?.title || "Event";

  const category = location.state?.category || "";
  const subCategory = location.state?.subCategory || "";
  const eventName = [category, subCategory, title].join(" > ");

  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);

  const totalPrice = tickets * price;

  // ❌ BLOCK DIRECT ACCESS
  if (!location.state?.price) {
    return <h2>❌ Invalid access. Please go back.</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/payment", {
      state: {
        eventDetail: id,
        eventName,
        userName,
        mobile,
        email,
        tickets,
        price,
        totalPrice,
      },
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h2>🎟️ Book Ticket</h2>

        <h3>🎉 {title}</h3>

        {/* ✅ USER PRICE SHOW */}
        <p style={{ color: "blue", fontWeight: "bold" }}>
          Price per ticket: ₹{price}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="email"
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

          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}

export default BookTicket;