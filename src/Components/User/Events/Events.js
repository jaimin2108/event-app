import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const API = "https://backend-event-zlss.onrender.com/api/v1/event";

function Events() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const parentTitle = location.state?.parentTitle || "";

  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/all-events`);
        const all = res.data.events || [];
        const childEvents = all.filter(e => {
          if (!e.parentEvent) return false;
          const pid = typeof e.parentEvent === "object" ? e.parentEvent._id : e.parentEvent;
          return String(pid) === String(id);
        });
        setChildren(childEvents);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{parentTitle} - Events</h2>

      {loading && <p>Loading...</p>}

      {!loading && children.length === 0 && <p>No events found</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        {children.map((c) => (
          <div
            key={c._id}
            onClick={() => navigate(`/event-details/${c._id}`, { state: { parentTitle, subTitle: c.title } })}
            style={{ border: "1px solid #ddd", padding: "10px", width: "200px", cursor: "pointer", borderRadius: "8px" }}
          >
            <img
              src={`https://backend-event-zlss.onrender.com/uploads/${c.image}`}
              alt={c.title}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
            />
            <p style={{ fontWeight: "bold", marginTop: "8px" }}>{c.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
