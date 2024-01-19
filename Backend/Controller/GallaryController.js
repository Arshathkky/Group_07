const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const UploadModel = require("../Model/GallarySchema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleware = multer({ storage, fileFilter });

const getPhotos = async (req, res) => {
  try {
    const allPhotos = await UploadModel.find().sort({ createdAt: "descending" });
    res.send(allPhotos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const postPhoto = async (req, res) => {
  try {
    const photo = req.file.filename;

    console.log(photo);

    const createdPhoto = await UploadModel.create({ photo });

    console.log("Uploaded Successfully...");
    console.log(createdPhoto);
    res.send(createdPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  uploadMiddleware,
  getPhotos,
  postPhoto,
};