import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Paymentdetail.css";

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  if (!bookingData) {
    return <p style={{ padding: "20px" }}>No booking data ❌</p>;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login required ❌");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/booking/create-booking",
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Payment Successful 🎉");
      navigate("/download-ticket", {
        state: { ...bookingData, createdAt: new Date() },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Payment Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>💳 Secure Payment</h2>
        <p><strong>Event:</strong> {bookingData.eventName}</p>
        <h3>Total: ₹{bookingData.totalPrice}</h3>

        <div className="tabs">
          <button onClick={() => setMethod("upi")} className={method === "upi" ? "active" : ""}>UPI</button>
          <button onClick={() => setMethod("card")} className={method === "card" ? "active" : ""}>Card</button>
          <button onClick={() => setMethod("netbanking")} className={method === "netbanking" ? "active" : ""}>Net Banking</button>
        </div>

        {method === "upi" && (
          <div className="section">
            <h4>Select UPI App</h4>
            <div className="upi-options">
              <button>GPay</button>
              <button>PhonePe</button>
              <button>Paytm</button>
            </div>
          </div>
        )}

        {method === "card" && (
          <div className="section">
            <h4>Card Details</h4>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Expiry MM/YY" />
            <input type="password" placeholder="CVV" />
          </div>
        )}

        {method === "netbanking" && (
          <div className="section">
            <h4>Select Bank</h4>
            <select>
              <option value="">Choose Bank</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
            </select>
          </div>
        )}

        <button onClick={handlePayment} className="pay-btn">
          {loading ? "Processing..." : `Pay ₹${bookingData.totalPrice}`}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
