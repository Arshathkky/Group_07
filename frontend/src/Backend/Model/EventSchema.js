const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: String,
    sportName:String,
    date: Date,
    teamA:String,
    teamB:String,
  });

const Event = mongoose.model('event', eventSchema);

module.exports =Event;
