import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./Paymentdetail.css";

function Paymentdetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);

  if (!bookingData) {
    return <h2 className="error">❌ No Booking Data Found</h2>;
  }

  const upiId = "jaimin@upi";

  const upiLink = `upi://pay?pa=${upiId}&pn=${bookingData.eventName}&am=${bookingData.totalPrice}&cu=INR`;

  const handlePay = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        eventDetail: bookingData.eventDetail,
        eventName: bookingData.eventName,
        userName: bookingData.userName,
        mobile: bookingData.mobile,
        email: bookingData.email,
        tickets: Number(bookingData.tickets) || 1,
        totalPrice: Number(bookingData.totalPrice) || 0,
      };

      const res = await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/booking/create-booking",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Payment Successful & Booking Done");
      navigate("/mybooking");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("❌ Payment done but booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        {/* LEFT SIDE */}
        <div className="left">
          <h2>💳 Payment Method</h2>

          <div className="tabs">
            <button onClick={() => setMethod("upi")} className={method==="upi"?"active":""}>UPI</button>
            <button onClick={() => setMethod("card")} className={method==="card"?"active":""}>Card</button>
            <button onClick={() => setMethod("net")} className={method==="net"?"active":""}>Net Banking</button>
          </div>

          {/* UPI */}
          {method === "upi" && (
            <div className="box">
              <h3>Scan QR Code</h3>
              <QRCodeCanvas value={upiLink} size={180} />
              <p><b>UPI ID:</b> {upiId}</p>

              <button onClick={handlePay} disabled={loading}>
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          )}

          {/* CARD */}
          {method === "card" && (
            <div className="box">
              <input placeholder="Card Number" />
              <input placeholder="Expiry (MM/YY)" />
              <input placeholder="CVV" />

              <button onClick={handlePay} disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          )}

          {/* NET BANKING */}
          {method === "net" && (
            <div className="box">
              <select>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>AXIS</option>
              </select>

              <button onClick={handlePay} disabled={loading}>
                Continue Payment
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="right">
          <h2>📄 Order Summary</h2>

          <div className="summary">
            <p><span>Event:</span> {bookingData.eventName}</p>
            <p><span>User:</span> {bookingData.userName}</p>
            <p><span>Tickets:</span> {bookingData.tickets}</p>

            <hr />

            <h3>Total: ₹{bookingData.totalPrice}</h3>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Paymentdetail;