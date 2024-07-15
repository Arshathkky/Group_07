const express = require('express');
const router = express.Router();
const NewsController = require('../Controller/NewsController');
const uploadMiddleware = require('../Multer');

router.get('/getNews', NewsController.getNews);
router.post('/addNews', uploadMiddleware.single("photo"), NewsController.postNews);
router.put('/updateNews/:id', uploadMiddleware.single("photo"), NewsController.updatedNews);
router.delete('/deleteNews/:id', NewsController.deletedNews);

module.exports = router;
