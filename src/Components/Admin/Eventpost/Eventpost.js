import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Eventpost.css";

const API = "https://backend-event-zlss.onrender.com/api/v1/event";
const BACKEND_URL = "https://backend-event-zlss.onrender.com";

function AdminEvents() {
  const [events, setEvents] = useState([]);

  const [parentTitle, setParentTitle] = useState("");
  const [childTitle, setChildTitle] = useState("");

  const [parentImage, setParentImage] = useState(null);
  const [childImage, setChildImage] = useState(null);

  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);

  // ================= LOAD EVENTS =================

  const loadEvents = async () => {
    try {
      const res = await axios.get(`${API}/all-events`);

      console.log("EVENTS:", res.data);

      setEvents(res.data.events || []);
    } catch (err) {
      console.log("Load Error:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // ================= CREATE PARENT =================

  const createParent = async (e) => {
    e.preventDefault();

    if (!parentTitle) {
      return alert("Enter parent title");
    }

    try {
      const formData = new FormData();

      formData.append("title", parentTitle);

      if (parentImage) {
        formData.append("image", parentImage);
      }

      const res = await axios.post(
        `${API}/create-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("Parent Event Created ✅");

      setParentTitle("");
      setParentImage(null);

      loadEvents();
    } catch (err) {
      console.log("Create Parent Error:", err.response);

      alert(
        err.response?.data?.message ||
          "Failed to create parent event"
      );
    }
  };

  // ================= CREATE CHILD =================

  const createChild = async (e) => {
    e.preventDefault();

    if (!childTitle || !selectedParentId) {
      return alert(
        "Enter child title & select parent"
      );
    }

    try {
      const formData = new FormData();

      formData.append("title", childTitle);
      formData.append("parentEvent", selectedParentId);

      if (childImage) {
        formData.append("image", childImage);
      }

      const res = await axios.post(
        `${API}/create-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("Child Event Created ✅");

      setChildTitle("");
      setChildImage(null);

      loadEvents();
    } catch (err) {
      console.log("Create Child Error:", err.response);

      alert(
        err.response?.data?.message ||
          "Failed to create child event"
      );
    }
  };

  // ================= DELETE EVENT =================

  const deleteEvent = async (id, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this event?")) {
      return;
    }

    try {
      await axios.delete(
        `${API}/delete-event/${id}`
      );

      if (selectedParent?._id === id) {
        setSelectedParent(null);
        setSelectedParentId("");
      }

      loadEvents();
    } catch (err) {
      console.log("Delete Error:", err.response);
    }
  };

  // ================= FILTER PARENTS =================

  const parentEvents = events.filter(
    (event) => !event.parentEvent
  );

  // ================= FILTER CHILDREN =================

  const childEvents = events.filter(
    (event) =>
      event.parentEvent &&
      (event.parentEvent._id === selectedParent?._id ||
        event.parentEvent === selectedParent?._id)
  );

  return (
    <div className="admin-events">
      <h2>Admin Events</h2>

      {/* ================= CREATE PARENT ================= */}

      <form
        className="form-box"
        onSubmit={createParent}
      >
        <input
          type="text"
          placeholder="Parent Event"
          value={parentTitle}
          onChange={(e) =>
            setParentTitle(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setParentImage(e.target.files[0])
          }
        />

        <button type="submit">
          Create Parent
        </button>
      </form>

      {/* ================= CREATE CHILD ================= */}

      <form
        className="form-box"
        onSubmit={createChild}
      >
        <input
          type="text"
          placeholder="Child Event"
          value={childTitle}
          onChange={(e) =>
            setChildTitle(e.target.value)
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setChildImage(e.target.files[0])
          }
        />

        <select
          value={selectedParentId}
          onChange={(e) => {
            const id = e.target.value;

            setSelectedParentId(id);

            const parent = parentEvents.find(
              (p) => p._id === id
            );

            setSelectedParent(parent);
          }}
        >
          <option value="">
            Select Parent Event
          </option>

          {parentEvents.map((parent) => (
            <option
              key={parent._id}
              value={parent._id}
            >
              {parent.title}
            </option>
          ))}
        </select>

        <button type="submit">
          Create Child
        </button>
      </form>

      {/* ================= PARENT EVENTS ================= */}

      <h3>Parent Events</h3>

      <div className="event-list">
        {parentEvents.length === 0 && (
          <p>No parent events found</p>
        )}

        {parentEvents.map((parent) => (
          <div
            key={parent._id}
            className={`event-card ${
              selectedParent?._id === parent._id
                ? "active"
                : ""
            }`}
            onClick={() => {
              setSelectedParent(parent);
              setSelectedParentId(parent._id);
            }}
          >
            {parent.image && (
              <img
                src={`${BACKEND_URL}${parent.image}`}
                alt={parent.title}
                className="event-image"
              />
            )}

            <p>{parent.title}</p>

            <button
              onClick={(e) =>
                deleteEvent(parent._id, e)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ================= CHILD EVENTS ================= */}

      {selectedParent && (
        <>
          <h3>
            Child Events of{" "}
            {selectedParent.title}
          </h3>

          {childEvents.length === 0 && (
            <p>No child events found</p>
          )}

          <div className="event-list">
            {childEvents.map((child) => (
              <div
                key={child._id}
                className="event-card child-card"
              >
                {child.image && (
                  <img
                    src={`${BACKEND_URL}${child.image}`}
                    alt={child.title}
                    className="event-image"
                  />
                )}

                <p>{child.title}</p>

                <button
                  onClick={(e) =>
                    deleteEvent(child._id, e)
                  }
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminEvents;