const { Router } = require("express");
const uploadMiddleware = require("../Multer");
const ImageController = require("../Controller/GalleryController");
const router = Router();

router.get("/api/get", ImageController.getPhotos);
router.post("/api/save", uploadMiddleware.single("photo"), ImageController.postPhoto);
router.delete("/api/delete/:id", ImageController.deletePhoto);

module.exports = router;
