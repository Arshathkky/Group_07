import React from "react";
import { useEffect, useState } from "react";

import ImageUploads from "./ImageUpload"
import axios from "axios";
const Grid = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
        console.log(res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

  return (
    <>
      <h1>Our Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={id} className="grid_item">
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt="grid_image"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Gallary;