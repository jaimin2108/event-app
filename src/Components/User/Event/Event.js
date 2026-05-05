import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/v1/event";

function EventPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API}/all-events`);
      const parentEvents = res.data.events.filter(e => !e.parentEvent);
      setEvents(parentEvents);
    };

    load();

    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>EVENT</h2>

      {events.map((e) => (
        <div
        
          key={e._id}
          onClick={() => navigate(`/events/${e._id}`, { state: { parentTitle: e.title } })}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <h3>{e.title}</h3>

          {e.image && (
            <img
              src={e.image.startsWith('http') ? e.image : `http://localhost:5000/uploads/${e.image}`}
              width="120"
              alt={e.title}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default EventPage;