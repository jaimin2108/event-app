import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyBooking.css";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                "https://backend-event-zlss.onrender.com/api/v1/booking/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                setBookings(res.data.bookings);
            }

        } catch (error) {
            console.log("Booking Error", error);
        }
    };
    const handleDownload = async (b) => {
        navigate("/download-ticket", { state: b });
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="mybooking">

            <h2>My Booking Details</h2>

            {bookings.length === 0 ? (
                <p>No bookings found</p>
            ) : (
                <div className="booking-container">
                    {bookings.map((b, index) => (
                        <div className="booking-card" key={index}>

                            <h3>{b.eventName}</h3>

                            <p>🎟 Tickets: {b.tickets}</p>
                            <p>💰 Total: ₹{b.totalPrice}</p>
                            <p>📅 Date: {new Date(b.createdAt).toLocaleDateString()}</p>
                            <button onClick={() => handleDownload(b)}>
                                Download Ticket
                            </button>
                        </div>

                    ))}
                </div>
            )}

        </div>
    );
};

export default MyBooking;
