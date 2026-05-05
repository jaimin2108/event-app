import React, { useState, useEffect } from "react";
import "./Addgallery.css";
import axios from "axios";

const Addgallery = () => {
  const [galleryName, setGalleryName] = useState("");
  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  // 🔥 Fetch all gallery
  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery/all");
      setGallery(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ✅ Upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!galleryName || !image) {
      alert("please fill all field");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", galleryName);
      formData.append("image", image);

      await axios.post("http://localhost:5000/api/gallery/upload", formData);

      alert("Gallery added successfully");

      setGalleryName("");
      setImage(null);

      fetchGallery(); // 🔥 refresh list
    } catch (error) {
      console.error(error);
      alert("upload failed");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/gallery/delete/${id}`);
      alert("Deleted successfully");
      fetchGallery();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="add-gallery-container">
      {/* FORM */}
      <div className="gallery-form">
        <div className="icon-circle">📷</div>
        <h3>Add Gallery</h3>

        <form onSubmit={handleSubmit}>
          <label className="upload-box">
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <span>Choose file</span>
            <span className="choose-pic">CHOOSE PIC</span>
          </label>

          <input
            type="text"
            placeholder="Gallery name*"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            className="gallery-input"
          />

          <button type="submit" className="post-btn">
            POST
          </button>
        </form>
      </div>

      {/* GALLERY LIST */}
      <div className="gallery-list">
        <h3>Gallery Posts</h3>

        <div className="gallery-grid">
          {gallery.map((item) => (
            <div key={item._id} className="gallery-card">
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                Delete ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addgallery;
