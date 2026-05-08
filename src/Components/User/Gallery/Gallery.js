import React, { useEffect, useState } from "react";
import "./Gallery.css";
 
function Gallery() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
 
  const itemsPerPage = 4; // show 2 images per page
  useEffect(() => {
    fetch("https://backend-event-zlss.onrender.com/api/gallery/all")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.data || []);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);
 
  const totalPages = Math.ceil(images.length / itemsPerPage);
 
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);
 
  return (
    <div className="main">
      <h2>Gallery</h2>
 
      <div className="gallery">
        {currentImages.map((item) => (
          <div className="card" key={item._id}>
            <img src={`https://backend-event-zlss.onrender.com/uploads/${item.image}`} alt={item.name} />
            <h4>{item.name}</h4>
          </div>
        ))}
 
      </div>
 
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          ⬅ Previous
        </button>
 
        <span className="page-number">
          Page {page} of {totalPages}
        </span>
 
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}
 
export default Gallery;
 
 
