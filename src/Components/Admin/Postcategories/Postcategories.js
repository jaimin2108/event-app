import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Postcategories.css";

const BASE_URL =
  "https://backend-event-zlss.onrender.com/api/v1";

function Postcategories() {
  const [events, setEvents] =
    useState([]);

  const [posts, setPosts] =
    useState([]);

  const [eventId, setEventId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [place, setPlace] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const token =
    localStorage.getItem("token");

  // ================= LOAD EVENTS =================

  const loadEvents = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/event/all-events`
      );

      setEvents(
        res.data.events || []
      );
    } catch (error) {
      console.log(
        "EVENT ERROR:",
        error
      );
    }
  };

  // ================= LOAD POSTS =================

  const loadPosts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/postcategories/all-posts`
      );

      setPosts(
        res.data.posts || []
      );
    } catch (error) {
      console.log(
        "POST ERROR:",
        error
      );
    }
  };

  useEffect(() => {
    loadEvents();
    loadPosts();
  }, []);

  // ================= RESET FORM =================

  const resetForm = () => {
    setEditId(null);

    setEventId("");

    setTitle("");

    setPrice("");

    setDate("");

    setTime("");

    setPlace("");
  };

  // ================= SUBMIT =================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    const data = {
      event: eventId,
      title,
      price,
      date,
      time,
      place,
    };

    try {
      // UPDATE

      if (editId) {
        await axios.put(
          `${BASE_URL}/postcategories/update-post/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Updated Successfully ✅"
        );
      }

      // CREATE

      else {
        await axios.post(
          `${BASE_URL}/postcategories/create-post`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Created Successfully ✅"
        );
      }

      resetForm();

      loadPosts();
    } catch (error) {
      console.log(
        "SUBMIT ERROR:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Something went wrong ❌"
      );
    }
  };

  // ================= DELETE =================

  const handleDelete = async (
    id
  ) => {
    try {
      await axios.delete(
        `${BASE_URL}/postcategories/delete-post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Deleted Successfully 🗑️"
      );

      loadPosts();
    } catch (error) {
      console.log(
        "DELETE ERROR:",
        error
      );
    }
  };

  // ================= EDIT =================

  const handleEdit = (p) => {
    setEditId(p._id);

    setEventId(
      typeof p.event === "object"
        ? p.event?._id
        : p.event
    );

    setTitle(p.title);

    setPrice(p.price);

    setDate(p.date);

    setTime(p.time);

    setPlace(p.place);
  };

  return (
    <div className="event-container">
      <h2>
        MATCH ADMIN PANEL
      </h2>

      {/* ================= FORM ================= */}

      <form
        className="event-form"
        onSubmit={handleSubmit}
      >
        <select
          value={eventId}
          onChange={(e) =>
            setEventId(
              e.target.value
            )
          }
        >
          <option value="">
            Select Event
          </option>

          {events.map((e) => (
            <option
              key={e._id}
              value={e._id}
            >
              {e.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Match Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(
              e.target.value
            )
          }
        />

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) =>
            setPlace(
              e.target.value
            )
          }
        />

        <button type="submit">
          {editId
            ? "Update Match"
            : "Create Match"}
        </button>
      </form>

      {/* ================= POSTS ================= */}

      <div className="event-list">
        {posts.map((p) => (
          <div
            key={p._id}
            className="event-card"
          >
            <h3>
              {p?.event?.title ||
                "No Event"}
            </h3>

            <h4>{p.title}</h4>

            <p>
              💰 ₹{p.price}
            </p>

            <p>
              📅 {p.date}
            </p>

            <p>
              ⏰ {p.time}
            </p>

            <p>
              📍 {p.place}
            </p>

            <button
              onClick={() =>
                handleEdit(p)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  p._id
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Postcategories;