import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
  "https://backend-event-zlss.onrender.com/api/v1/event";

const BACKEND_URL =
  "https://backend-event-zlss.onrender.com";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ================= LOAD EVENTS =================

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/all-events`
      );

      console.log("FULL API DATA:", res.data);

      // ONLY PARENT EVENTS

      const parentEvents = (
        res.data.events || []
      ).filter((event) => !event.parentEvent);

      console.log("PARENT EVENTS:", parentEvents);

      setEvents(parentEvents);
    } catch (err) {
      console.log("EVENT FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= IMAGE URL =================

  const getImageUrl = (image) => {
    if (!image) {
      return "https://dummyimage.com/600x400/cccccc/000000&text=No+Image";
    }

    console.log("ORIGINAL IMAGE:", image);

    // IF FULL URL
    if (image.startsWith("http")) {
      return image;
    }

    // REMOVE EXTRA SLASHES
    const cleanImage = image.replace(/\\/g, "/");

    // IF IMAGE ALREADY STARTS WITH uploads
    if (cleanImage.startsWith("uploads")) {
      return `${BACKEND_URL}/${cleanImage}`;
    }

    // IF IMAGE STARTS WITH /
    if (cleanImage.startsWith("/")) {
      return `${BACKEND_URL}${cleanImage}`;
    }

    // DEFAULT
    return `${BACKEND_URL}/uploads/${cleanImage}`;
  };

  // ================= UI =================

  return (
    <div
      style={{
        padding: "20px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        EVENTS
      </h1>

      {/* LOADING */}

      {loading && (
        <h2 style={{ textAlign: "center" }}>
          Loading...
        </h2>
      )}

      {/* NO EVENTS */}

      {!loading && events.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          No Events Found
        </h2>
      )}

      {/* EVENT GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {events.map((e) => (
          <div
            key={e?._id}
            onClick={() =>
              navigate(`/events/${e?._id}`, {
                state: {
                  parentTitle: e?.title,
                },
              })
            }
            style={{
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            {/* IMAGE */}

            <img
              src={getImageUrl(e?.image)}
              alt={e?.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
              onError={(err) => {
                console.log(
                  "FAILED IMAGE:",
                  err.target.src
                );

                err.target.src =
                  "https://dummyimage.com/600x400/cccccc/000000&text=No+Image";
              }}
            />

            {/* TITLE */}

            <div style={{ padding: "15px" }}>
              <h2
                style={{
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {e?.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventPage;