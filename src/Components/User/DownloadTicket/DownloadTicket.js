import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./DownloadTicket.css";

function DownloadTicket() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  if (!booking) {
    return <p style={{ padding: "20px" }}>No ticket data found ❌</p>;
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageW = doc.internal.pageSize.getWidth();

    doc.setFillColor(2, 132, 199);
    doc.rect(0, 0, pageW, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("EVENT TICKET", pageW / 2, 22, { align: "center" });
    doc.setFontSize(11);
    doc.text("Booking Confirmation", pageW / 2, 32, { align: "center" });

    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 50, pageW - 30, 130, 5, 5);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(booking.eventName || "Event", pageW / 2, 65, { align: "center" });

    doc.setDrawColor(200, 200, 200);
    doc.line(25, 70, pageW - 25, 70);

    const details = [
      ["Name", booking.userName],
      ["Email", booking.email],
      ["Mobile", booking.mobile],
      ["Tickets", booking.tickets],
      ["Total Price", `Rs. ${booking.totalPrice}`],
      ["Date", new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })],
      ["Status", "CONFIRMED"],
    ];

    let y = 82;
    details.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text(label + ":", 25, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      doc.text(String(value), 80, y);
      y += 13;
    });

    doc.setFillColor(241, 245, 249);
    doc.rect(15, 185, pageW - 30, 20, "F");
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("Thank you for booking! Show this ticket at the event entrance.", pageW / 2, 197, { align: "center" });

    doc.save(`ticket-${booking.userName || "booking"}.pdf`);
  };

  return (
    <div className="download-page">
      <div className="download-card">
        <div className="ticket-icon">🎟️</div>
        <h2>Your Ticket is Ready!</h2>
        <p className="event-name">{booking.eventName}</p>

        <div className="ticket-details">
          <div className="detail-row">
            <span>👤 Name</span>
            <span>{booking.userName}</span>
          </div>
          <div className="detail-row">
            <span>🎫 Tickets</span>
            <span>{booking.tickets}</span>
          </div>
          <div className="detail-row">
            <span>💰 Total</span>
            <span>₹{booking.totalPrice}</span>
          </div>
          <div className="detail-row">
            <span>📅 Date</span>
            <span>{new Date(booking.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
          <div className="detail-row">
            <span>✅ Status</span>
            <span className="status">CONFIRMED</span>
          </div>
        </div>

        <div className="download-actions">
          <button className="download-btn" onClick={handleDownload}>
            ⬇️ Download Ticket PDF
          </button>
          <button className="back-btn" onClick={() => navigate("/mybooking")}>
            ← Back to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadTicket;
