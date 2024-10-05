const UploadModel = require("../Model/GallerySchema");

const getPhotos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const allPhotos = await UploadModel.find(query).sort({ createdAt: "descending" }).skip(skip).limit(limit);
    res.send(allPhotos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const postPhoto = async (req, res) => {
  try {
    const { filename: photo } = req.file;
    const { category, description } = req.body;

    const createdPhoto = await UploadModel.create({ photo, category, description });

    res.send(createdPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deletePhoto = async (req, res) => {
  try {
    const id = req.params.id;
    await UploadModel.findByIdAndDelete(id);
    res.send({ message: "Deleted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getPhotos,
  postPhoto,
  deletePhoto,
};
