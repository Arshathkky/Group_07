const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  score: Number
});

const teamSchema = new mongoose.Schema({
  name: String,
  players: [playerSchema],
  totalScore: Number
});

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // 'team' or 'individual'
  teams: [teamSchema],
  numPlayers: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sport', sportSchema);
