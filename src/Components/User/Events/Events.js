import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

const API =
  "https://backend-event-zlss.onrender.com/api/v1/event";

const BACKEND_URL =
  "https://backend-event-zlss.onrender.com";

function Events() {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const parentTitle =
    location.state?.parentTitle || "";

  const [children, setChildren] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API}/all-events`
        );

        const all = res.data.events || [];

        const childEvents = all.filter((e) => {
          if (!e.parentEvent) return false;

          const pid =
            typeof e.parentEvent === "object"
              ? e.parentEvent._id
              : e.parentEvent;

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
    <div
      style={{
        padding: "30px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "40px",
        }}
      >
        {parentTitle} Events
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && children.length === 0 && (
        <p>No events found</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "25px",
        }}
      >
        {children.map((c) => (
          <div
            key={c._id}
            onClick={() =>
              navigate(
                `/event-details/${c._id}`,
                {
                  state: {
                    parentTitle,
                    subTitle: c.title,
                  },
                }
              )
            }
            style={{
              background: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* ===== IMAGE FIX ===== */}

            {c.image && (
              <img
                src={`${BACKEND_URL}${c.image}`}
                alt={c.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />
            )}

            <div
              style={{
                padding: "15px",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                {c.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;