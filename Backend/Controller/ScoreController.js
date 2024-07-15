const SportModel = require('../Model/ScoreSchema');

const getScore = async (req, res) => {
    try {
        const scores = await SportModel.find({});
        res.json(scores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addScore = async (req, res) => {
    const newScore = req.body;

    try {
        const scores = await SportModel.create(newScore);
        res.status(201).json(scores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateScore = async (req, res) => {
    const scoreId = req.params.id;
    const updatedScore = req.body;

    try {
        const updatedScoreDoc = await SportModel.findByIdAndUpdate(scoreId, updatedScore, { new: true });
        if (!updatedScoreDoc) {
            return res.status(404).json({ error: "Score not found" });
        }

        res.json(updatedScoreDoc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteScore = async (req, res) => {
    const scoreId = req.params.id;

    try {
        const deletedScore = await SportModel.findByIdAndDelete(scoreId);
        if (!deletedScore) {
            return res.status(404).json({ error: "Score not found" });
        }

        res.json({ message: "Score deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getScoreById = async (req, res) => {
    const scoreId = req.params.id;

    try {
        const score = await SportModel.findById(scoreId);
        if (!score) {
            return res.status(404).json({ error: "Score not found" });
        }

        res.json(score);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getLatestScore = async (req, res) => {
    try {
        const latestScore = await SportModel.findOne().sort({ _id: -1 }).limit(1);
        if (!latestScore) {
            return res.status(404).json({ error: "No scores found" });
        }

        res.json([latestScore]); // Wrap the score in an array
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getScore,
    addScore,
    updateScore,
    deleteScore,
    getScoreById,
    getLatestScore
};
