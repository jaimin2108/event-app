import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import "./Eventdetail.css";

const BASE_URL = "https://backend-event-zlss.onrender.com/api/v1";

function EventDetailsPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const parentTitle = location.state?.parentTitle || "";
  const subTitle = location.state?.subTitle || "";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customPrice, setCustomPrice] = useState({});

  const userId =
    Cookies.get("userId") ||
    JSON.parse(localStorage.getItem("user") || "{}")._id;

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/postcategories/all-posts`,
        {
          headers: {
            userid: userId,
          },
        }
      );

      console.log("API RESPONSE:", res.data);

      const allPosts = res.data.posts || [];

      // FIXED FILTER
      const filteredPosts = allPosts.filter((p) => {
        if (!p.event) return false;

        // Handle populated object
        if (typeof p.event === "object") {
          return String(p.event._id) === String(id);
        }

        // Handle direct id string
        return String(p.event) === String(id);
      });

      console.log("FILTERED POSTS:", filteredPosts);

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetPrice = async (postId) => {
    const price = Number(customPrice[postId]);

    if (!price || price <= 0) {
      return alert("Enter valid price");
    }

    try {
      await axios.post(
        `${BASE_URL}/postcategories/set-price`,
        {
          postId,
          price,
        },
        {
          headers: {
            userid: userId,
          },
        }
      );

      alert("Price Updated ✅");

      fetchPosts();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to update price ❌"
      );
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="event-container">
      <h2>Event Details</h2>

      <div className="event-list">
        {posts.length === 0 ? (
          <p>No Event Details Found ❌</p>
        ) : (
          posts.map((item) => (
            <div key={item._id} className="event-card">
              <h3>{item.title}</h3>

              <p>
                💰 Admin Price: ₹
                {item.realPrice || 0}
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
                  setCustomPrice({
                    ...customPrice,
                    [item._id]: e.target.value,
                  })
                }
              />

              <button
                onClick={() => handleSetPrice(item._id)}
              >
                Update Price
              </button>

              <button
                onClick={() => handleBookNow(item)}
              >
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