import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Eventpost.css";

const API = "https://backend-event-zlss.onrender.com/api/v1/event";
const IMAGE_URL = "https://backend-event-zlss.onrender.com/uploads";

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [parentTitle, setParentTitle] = useState("");
  const [childTitle, setChildTitle] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);

  const [parentImage, setParentImage] = useState(null);
  const [childImage, setChildImage] = useState(null);

  // ✅ LOAD EVENTS
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

  // ✅ CREATE PARENT
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

      await axios.post(
        `${API}/create-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Parent Event Created ✅");

      setParentTitle("");
      setParentImage(null);

      loadEvents();

    } catch (err) {
      console.log("Create Parent Error:", err);
      alert("Failed to create parent event");
    }
  };

  // ✅ CREATE CHILD
  const createChild = async (e) => {
    e.preventDefault();

    if (!childTitle || !selectedParentId) {
      return alert("Enter child title & select parent");
    }

    try {

      const formData = new FormData();

      formData.append("title", childTitle);
      formData.append("parentEvent", selectedParentId);

      if (childImage) {
        formData.append("image", childImage);
      }

      await axios.post(
        `${API}/create-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Child Event Created ✅");

      setChildTitle("");
      setChildImage(null);

      loadEvents();

    } catch (err) {
      console.log("Create Child Error:", err);
      alert("Failed to create child event");
    }
  };

  // ✅ DELETE EVENT
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

  // ✅ FILTER PARENTS
  const parentEvents = events.filter(
    (event) => !event.parentEvent
  );

  // ✅ FILTER CHILDREN
  const childEvents = events.filter(
    (event) =>
      event.parentEvent &&
      (
        event.parentEvent._id === selectedParent?._id ||
        event.parentEvent === selectedParent?._id
      )
  );

  return (
    <div className="admin-events">

      <h2>Admin Events</h2>

      {/* CREATE PARENT */}
      <form className="form-box" onSubmit={createParent}>

        <input
          type="text"
          value={parentTitle}
          onChange={(e) => setParentTitle(e.target.value)}
          placeholder="Parent Event"
        />

        <input
          type="file"
          onChange={(e) => setParentImage(e.target.files[0])}
        />

        <button type="submit">
          Create Parent
        </button>

      </form>

      {/* CREATE CHILD */}
      <form className="form-box" onSubmit={createChild}>

        <input
          type="text"
          value={childTitle}
          onChange={(e) => setChildTitle(e.target.value)}
          placeholder="Child Event"
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

        <input
          type="file"
          onChange={(e) => setChildImage(e.target.files[0])}
        />

        <button type="submit">
          Create Child
        </button>

      </form>

      {/* PARENT EVENTS */}
      <h3>Parent Events</h3>

      <div className="event-list">

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

            <p>{parent.title}</p>

            {parent.image && (
              <img
                src={`${IMAGE_URL}/${parent.image}`}
                alt=""
              />
            )}

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

      {/* CHILD EVENTS */}
      {selectedParent && (
        <>

          <h3>
            Child Events of {selectedParent.title}
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

                <p>{child.title}</p>

                {child.image && (
                  <img
                    src={`${IMAGE_URL}/${child.image}`}
                    alt=""
                  />
                )}

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