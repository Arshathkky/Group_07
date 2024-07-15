const express = require('express');
const router = express.Router();
const sportController = require('../Controller/ScoreController');

router.post('/', (req, res) => sportController.addSport(req, res, req.app.get('io')));
router.put('/:id', (req, res) => sportController.updateScore(req, res, req.app.get('io')));
router.delete('/:id', (req, res) => sportController.deleteSport(req, res, req.app.get('io')));
router.get('/', sportController.getAllSports);

module.exports = router;
