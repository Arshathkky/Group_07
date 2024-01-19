const { Router } = require("express");
const uploadMiddleware = require("../Controller/GallaryController");
const UploadModel = require("../Model/GallarySchema");
const ImageController =require('../Controller/GallaryController')
const router = Router();

router.get("/api/get",ImageController.getPhotos);

router.post("/api/save", ImageController.uploadMiddleware.single("photo"),ImageController.postPhoto)

module.exports = router;