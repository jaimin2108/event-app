import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API =
  "https://backend-event-zlss.onrender.com/api/v1/event";

const BACKEND_URL =
  "https://backend-event-zlss.onrender.com";

function EventPage() {

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // ================= LOAD EVENTS =================

  useEffect(() => {

    const loadEvents = async () => {

      try {

        const res = await axios.get(
          `${API}/all-events`
        );

        console.log("EVENTS:", res.data);

        // ONLY PARENT EVENTS
        const parentEvents =
          (res.data.events || []).filter(
            (event) => !event.parentEvent
          );

        setEvents(parentEvents);

      } catch (error) {

        console.log(
          "LOAD ERROR:",
          error
        );
      }
    };

    loadEvents();

  }, []);

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        EVENTS
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >

        {events.length === 0 && (
          <p>No Events Found</p>
        )}

        {events.map((event) => (

          <div
            key={event._id}

            onClick={() =>
              navigate(
                `/events/${event._id}`,
                {
                  state: {
                    parentTitle:
                      event.title,
                  },
                }
              )
            }

            style={{
              border:
                "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.1)",
              transition:
                "0.3s",
              background: "#fff",
            }}
          >

            {/* ================= IMAGE ================= */}

            {event.image ? (

              <img
                src={
                  event.image.startsWith(
                    "http"
                  )
                    ? event.image
                    : `${BACKEND_URL}${event.image}`
                }

                alt={event.title}

                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}

                onError={(e) => {
                  console.log(
                    "IMAGE FAILED:",
                    event.image
                  );

                  e.target.style.display =
                    "none";
                }}
              />

            ) : (

              <div
                style={{
                  height: "200px",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  background:
                    "#f1f1f1",
                  color: "#777",
                }}
              >
                No Image
              </div>

            )}

            {/* ================= TITLE ================= */}

            <div
              style={{
                padding: "15px",
              }}
            >

              <h3
                style={{
                  margin: 0,
                  textAlign:
                    "center",
                }}
              >
                {event.title}
              </h3>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EventPage;