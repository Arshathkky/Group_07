import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const AddGallery = () => {
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

  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`http://localhost:5000/api/photos/${photoId}`);
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo._id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleUpdate = (photoId) => {
    console.log('Update photo with id:', photoId);
    // Add logic for updating a photo, for example, opening a modal or navigating to an update page
  };

  const handleChange = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", e.target.files[0]);

    axios
      .post("http://localhost:5000/api/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Our Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="grid_item">
            <img src={`http://localhost:5000/uploads/${photo}`} alt="grid_image" />
            
          </div>
        ))}
      </div>

      <label htmlFor="file_picker" className="button">
        <AiFillPlusCircle />
        <input
          hidden
          type="file"
          name="file_picker"
          id="file_picker"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </>
  );
};

export default AddGallery;