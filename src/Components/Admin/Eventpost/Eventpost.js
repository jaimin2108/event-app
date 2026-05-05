import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Eventpost.css";

const API = "http://localhost:5000/api/v1/event";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [parentTitle, setParentTitle] = useState("");
  const [childTitle, setChildTitle] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);

  const [parentImage, setParentImage] = useState(null);
  const [childImage, setChildImage] = useState(null);

  const loadEvents = async () => {
    try {
      const res = await axios.get(`${API}/all-events`);
      setEvents(res.data.events);
    } catch (err) {
      console.log("Load Error:", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // CREATE PARENT
  const createParent = async (e) => {
    e.preventDefault();
    if (!parentTitle) return alert("Enter parent title");

    try {
      const formData = new FormData();
      formData.append("title", parentTitle);
      if (parentImage) formData.append("image", parentImage);

      await axios.post(`${API}/create-event`, formData);

      setParentTitle("");
      setParentImage(null);
      loadEvents();
    } catch (err) {
      console.log("Create Parent Error:", err);
    }
  };

  // CREATE CHILD
  const createChild = async (e) => {
    e.preventDefault();

    if (!childTitle || !selectedParentId) {
      return alert("Enter child title & select parent");
    }

    try {
      const formData = new FormData();
      formData.append("title", childTitle);
      formData.append("parentEvent", selectedParentId);
      if (childImage) formData.append("image", childImage);

      await axios.post(`${API}/create-event`, formData);

      setChildTitle("");
      setChildImage(null);
      loadEvents();
    } catch (err) {
      console.log("Create Child Error:", err);
    }
  };

  // DELETE
  const deleteEvent = async (id, e) => {
    e.stopPropagation();

    if (!window.confirm("Delete this event?")) return;

    try {
      await axios.delete(`${API}/delete-event/${id}`);

      if (selectedParent?._id === id) {
        setSelectedParent(null);
        setSelectedParentId("");
      }

      loadEvents();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // FILTER
  const parentEvents = events.filter((e) => !e.parentEvent);

  const childEvents = events.filter(
    (e) =>
      e.parentEvent &&
      (e.parentEvent._id === selectedParent?._id ||
        e.parentEvent === selectedParent?._id)
  );

  return (
    <div className="admin-events">
      <h2>Admin Events</h2>

      {/* CREATE PARENT */}
      <form className="form-box" onSubmit={createParent}>
        <input
          value={parentTitle}
          onChange={(e) => setParentTitle(e.target.value)}
          placeholder="Parent Event"
        />
        <input
          type="file"
          onChange={(e) => setParentImage(e.target.files[0])}
        />
        <button>Create Parent</button>
      </form>

      {/* CREATE CHILD */}
      <form className="form-box" onSubmit={createChild}>
        <input
          value={childTitle}
          onChange={(e) => setChildTitle(e.target.value)}
          placeholder="Child Event"
        />

        <select
          value={selectedParentId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedParentId(id);
            setSelectedParent(parentEvents.find((p) => p._id === id));
          }}
        >
          <option value="">Select Parent</option>
          {parentEvents.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setChildImage(e.target.files[0])}
        />
        <button>Create Child</button>
      </form>

      {/* PARENT LIST */}
      <h3>Parent Events</h3>

      <div className="event-list">
        {parentEvents.map((p) => (
          <div
            key={p._id}
            onClick={() => {
              setSelectedParent(p);
              setSelectedParentId(p._id);
            }}
            className={`event-card ${
              selectedParent?._id === p._id ? "active" : ""
            }`}
          >
            <p>{p.title}</p>

            {p.image && (
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt=""
              />
            )}

            <button onClick={(e) => deleteEvent(p._id, e)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* CHILD LIST */}
      {selectedParent && (
        <>
          <h3>Child Events of {selectedParent.title}</h3>

          {childEvents.length === 0 && (
            <p className="empty-text">No child events</p>
          )}

          <div className="event-list">
            {childEvents.map((c) => (
              <div key={c._id} className="event-card child-card">
                <p>{c.title}</p>

                {c.image && (
                  <img
                    src={`http://localhost:5000/uploads/${c.image}`}
                    alt=""
                  />
                )}

                <button onClick={(e) => deleteEvent(c._id, e)}>
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