// src/components/Gallery.jsx
import React from 'react';
import './Gallery.css'; // Optional CSS for styling

const Gallery = () => {
  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {/* Example of artwork grid (you can dynamically populate this with actual data) */}
        <div className="artwork-item">Artwork 1</div>
        <div className="artwork-item">Artwork 2</div>
        <div className="artwork-item">Artwork 3</div>
        <div className="artwork-item">Artwork 4</div>
      </div>
    </div>
  );
};

export default Gallery;
