import React, { useEffect, useState } from "react";
import axios from "axios";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const photosPerPage = 10;

  const fetchPhotos = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get?page=${page}&limit=${photosPerPage}`);
      const fetchedPhotos = response.data;
      if (fetchedPhotos.length < photosPerPage) {
        setHasMore(false);
      }
      setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  };

  useEffect(() => {
    fetchPhotos(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="gallery-container">
      <h1>Our Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id, description }) => (
          <div key={_id} className="grid__item">
            <img src={`http://localhost:5000/uploads/${photo}`} alt="grid_image" />
            {description && <p className="description">{description}</p>}
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className="load-more-button">Load More</button>
      )}
    </div>
  );
};

export default Gallery;
