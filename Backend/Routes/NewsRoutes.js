const express = require('express');
const router = express.Router();
const NewsController = require('../Controller/NewsController')

router.get('/getNews', NewsController.getNews);
router.post('/addNews', NewsController.postNews);
router.put('/updateNews/:id', NewsController.updatedNews);
router.delete('/deleteNews/:id', NewsController.deletedNews);


module.exports = router;