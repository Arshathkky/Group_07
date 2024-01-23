const express = require('express');
const sportController = require('../Controller/ScoreController');

const router = express.Router();

router.get("/getScore", sportController.getScore);
router.post("/addScore", sportController.addScore);
router.put("/updateScore/:id", sportController.updateScore);
router.delete("/deleteScore/:id", sportController.deleteScore);
router.get("/getScore/:id", sportController.getScoreById);
router.get("/getLatest", sportController.getLatestScore);

module.exports = router;
