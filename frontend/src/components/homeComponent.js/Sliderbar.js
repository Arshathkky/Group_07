import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Sliderbar = () => {
  const [slideImages, setSlideImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get?category=achievement");
        const achievements = response.data;
        const lastFourAchievements = achievements.slice(-4); // Get the last 4 achievements
        const imageUrls = lastFourAchievements.map(photo => ({
          url: `http://localhost:5000/uploads/${photo.photo}`,
          description: photo.description
        }));
        setSlideImages(imageUrls);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (slideImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slideImages.length);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [slideImages]);

  if (!slideImages.length) return <div>Loading...</div>;

  return (
    <div className="slider-container">
      <div className="slider">
        {slideImages.map((slide, index) => (
          <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
            <img src={slide.url} alt={`Slide ${index}`} className="slide-image" />
            {slide.description && <p className="description">{slide.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sliderbar;
