import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Postcategories.css";

const BASE_URL = "http://localhost:5000/api/v1";

function AdminPostCategories() {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);

  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [realPrice, setRealPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // LOAD EVENTS
  const loadEvents = async () => {
    const res = await axios.get(`${BASE_URL}/event/all-events`);
    setEvents(res.data.events || []);
  };

  // LOAD POSTS
  const loadPosts = async () => {
    const res = await axios.get(`${BASE_URL}/postcategories/all-posts`);
    setPosts(res.data.posts || []);
  };

  useEffect(() => {
    loadEvents();
    loadPosts();
  }, []);

  // RESET
  const resetForm = () => {
    setEditId(null);
    setEventId("");
    setTitle("");
    setRealPrice("");
    setDate("");
    setTime("");
    setPlace("");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventId) return alert("Select Event ❌");

    if (realPrice === "" || isNaN(realPrice) || Number(realPrice) <= 0) {
      return alert("Enter valid price ❌");
    }

    const data = {
      event: eventId,
      title,
      realPrice: parseInt(realPrice), // ✅ FIXED
      date,
      time,
      place,
    };

    try {
      if (editId) {
        await axios.put(
          `${BASE_URL}/postcategories/update-post/${editId}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Updated ✅");
      } else {
        await axios.post(
          `${BASE_URL}/postcategories/create-post`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Created ✅");
      }

      resetForm();
      loadPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this match?")) return;

    await axios.delete(
      `${BASE_URL}/postcategories/delete-post/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    loadPosts();
  };

  // EDIT
  const handleEdit = (p) => {
    setEditId(p._id);

    setEventId(typeof p.event === "object" ? p.event._id : p.event);

    setTitle(p.title);
    setRealPrice(p.realPrice?.toString() || ""); // ✅ FIXED
    setDate(p.date);
    setTime(p.time);
    setPlace(p.place);
  };

  return (
    <div className="event-container">
      <h2>🏏 MATCH ADMIN PANEL</h2>

      <form onSubmit={handleSubmit} className="event-form">
        <select value={eventId} onChange={(e) => setEventId(e.target.value)}>
          <option value="">Select Event</option>
          {events.map((e) => (
            <option key={e._id} value={e._id}>
              {e.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Match Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          min="1"
          placeholder="Price"
          value={realPrice}
          onChange={(e) => setRealPrice(e.target.value)}
        />

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <input
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update Match" : "Create Match"}
        </button>
      </form>

      <div className="event-list">
        {posts.map((p) => {
          const eid =
            typeof p.event === "object" ? p.event._id : p.event;

          const foundEvent = events.find((e) => e._id === eid);

          return (
            <div key={p._id} className="event-card">
              <h3>{foundEvent?.title}</h3>
              <h4>{p.title}</h4>

              {/* ✅ FIXED DISPLAY */}
              <p>💰 ₹{p.realPrice}</p>

              <p>📅 {p.date}</p>
              <p>⏰ {p.time}</p>
              <p>📍 {p.place}</p>

              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPostCategories;