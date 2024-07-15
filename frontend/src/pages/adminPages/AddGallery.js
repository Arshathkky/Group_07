import React, { useState, useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const AddGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [updateUI, setUpdateUI] = useState("");
<<<<<<< HEAD
  const [category, setCategory] = useState("achievement");
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
=======
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get")
      .then((res) => {
<<<<<<< HEAD
=======
        console.log(res.data);
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
        setPhotos(res.data);
      })
      .catch((err) => console.log(err));
  }, [updateUI]);

<<<<<<< HEAD
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("category", category);
    if (category === "achievement") {
      formData.append("description", description);
    }
=======
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
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be

    axios
      .post("http://localhost:5000/api/save", formData)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(res.data._id);
<<<<<<< HEAD
        setSelectedFile(null);
        setDescription("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setUpdateUI(id);
=======
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
      })
      .catch((err) => console.log(err));
  };

  return (
<<<<<<< HEAD
    <div className="adminContainer">
      <h1>Our Gallery</h1>
      <div className="uploadSection">
        {selectedFile && (
          <div className="form-group">
            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="achievement">Achievement</option>
              <option value="gallery">Gallery</option>
            </select>
            {category === "achievement" && (
              <textarea
                placeholder="Enter description for achievement"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            )}
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}
      </div>
      <div className="grid">
        {photos.map(({ photo, _id, category, description }) => (
          <div key={_id} className="grid__item">
            <img
              src={`http://localhost:5000/uploads/${photo}`}
              alt="grid_image"
              className="gallery-image"
            />
            {category === "achievement" && <p>{description}</p>}
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </div>
        ))}
      </div>
      <label htmlFor="file_picker_fixed" className="galleryButtonFixed">
=======
    <>
      <h1>Our Gallery</h1>
      <div className="grid">
        {photos.map(({ photo, _id }) => (
          <div key={_id} className="grid_item">
            <img src={`http://localhost:5000/uploads/${photo}`} alt="grid_image" />
            
          </div>
        ))}
      </div>

      <label htmlFor="file_picker" className="galleryButton">
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
        <AiFillPlusCircle />
        <input
          hidden
          type="file"
<<<<<<< HEAD
          name="file_picker_fixed"
          id="file_picker_fixed"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default AddGallery;
=======
          name="file_picker"
          id="file_picker"
          onChange={(e) => handleChange(e)}
        />
      </label>
    </>
  );
};

export default AddGallery;
>>>>>>> 7049bfaadff65d98f7c558e5e690a8ff67f834be
