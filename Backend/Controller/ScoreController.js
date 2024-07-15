const SportModel = require('../Model/ScoreSchema');

const calculateTotalScore = (players) => {
  return players.reduce((total, player) => total + (parseInt(player.score) || 0), 0);
};

const addSport = async (req, res, io) => {
  const { name, type, teams, numPlayers } = req.body;

  try {
    const newSport = new SportModel({ name, type, teams, numPlayers });
    const savedSport = await newSport.save();
    io.emit('update', { type: 'addSport', data: savedSport });
    res.status(201).json(savedSport);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateScore = async (req, res, io) => {
  const scoreId = req.params.id;
  const updatedScore = req.body;

  try {
    if (updatedScore.teams) {
      updatedScore.teams = updatedScore.teams.map(team => ({
        ...team,
        totalScore: calculateTotalScore(team.players),
      }));
    }
    const score = await SportModel.findByIdAndUpdate(scoreId, updatedScore, { new: true });
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    io.emit('update', { type: 'updateScore', data: score });
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSport = async (req, res, io) => {
  const sportId = req.params.id;

  try {
    const sport = await SportModel.findByIdAndDelete(sportId);
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }
    io.emit('update', { type: 'deleteSport', data: sportId });
    res.json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllSports = async (req, res) => {
  try {
    const sports = await SportModel.find().sort({ createdAt: -1 }).limit(25); // Get the latest 25 sports
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addSport,
  updateScore,
  deleteSport,
  getAllSports,
};
