import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://backend-event-zlss.onrender.com/api/v1/event";
const BACKEND_URL = "https://backend-event-zlss.onrender.com";

function EventPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await axios.get(`${API}/all-events`);

        const parentEvents = (res.data.events || []).filter(
          (event) => !event.parentEvent
        );

        console.log(parentEvents);

        setEvents(parentEvents);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    loadEvents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        EVENT
      </h1>

      {events.map((e) => (
        <div
          key={e._id}
          onClick={() =>
            navigate(`/events/${e._id}`, {
              state: {
                parentTitle: e.title,
              },
            })
          }
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            cursor: "pointer",
            background: "#fff",
          }}
        >
          <h2>{e.title}</h2>

          {e.image && (
            <img
              src={`${BACKEND_URL}${e.image}`}
              alt={e.title}
              style={{
                width: "300px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginTop: "10px",
              }}
              onError={(err) => {
                console.log("IMAGE ERROR");

                err.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default EventPage;