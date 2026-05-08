import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Eventdetail.css";

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const parentTitle = location.state?.parentTitle || "";
  const subTitle = location.state?.subTitle || "";

  const [posts, setPosts] = useState([]);
  const [customPrice, setCustomPrice] = useState({});

  const userId = Cookies.get("userId") || JSON.parse(localStorage.getItem("user") || "{}")._id;

  useEffect(() => {
    axios
      .get("https://backend-event-zlss.onrender.com/api/v1/postcategories/all-posts", {
        headers: { userid: userId },
      })
      .then((res) => {
        const all = res.data.posts || [];
        const filtered = all.filter((p) => {
          const eventId = typeof p.event === "object" ? p.event._id : p.event;
          return String(eventId) === String(id);
        });
        setPosts(filtered);
      })
      .catch((err) => console.log(err));
  }, [id, userId]);

  const handleSetPrice = async (postId) => {
    const price = Number(customPrice[postId]);
    if (!price || price <= 0) return alert("Enter valid price");

    try {
      await axios.post(
        "https://backend-event-zlss.onrender.com/api/v1/postcategories/set-price",
        { postId, price },
        { headers: { userid: userId } }
      );
      alert("Price Updated ✅");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to update price ❌");
    }
  };

  const handleBookNow = (item) => {
    const price = item.userPrice || item.realPrice;
    navigate(`/book/${item._id}`, {
      state: {
        price,
        title: item.title,
        category: parentTitle,
        subCategory: subTitle,
      },
    });
  };

  return (
    <div className="event-container">
      <h2>Event Details</h2>
      <div className="event-list">
        {posts.length === 0 ? (
          <p>No Event Details Found ❌</p>
        ) : (
          posts.map((item) => (
            <div key={item._id} className="event-card">
              <h4>{item.title}</h4>

              <p>
                💰 Admin Price: ₹{item.realPrice}
              </p>

              {item.userPrice && (
                <p style={{ color: "green" }}>
                  ✅ Your Price: ₹{item.userPrice}
                </p>
              )}

              <p>📅 {item.date}</p>
              <p>⏰ {item.time}</p>
              <p>📍 {item.place}</p>

              <input
                type="number"
                placeholder="Enter your price"
                value={customPrice[item._id] || ""}
                onChange={(e) =>
                  setCustomPrice({ ...customPrice, [item._id]: e.target.value })
                }
              />
              <button onClick={() => handleSetPrice(item._id)}>
                Update Price
              </button>

              <button onClick={() => handleBookNow(item)}>
                Book Now 🎟️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventDetailsPage;
