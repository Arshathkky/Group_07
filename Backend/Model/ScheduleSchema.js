// models/schedule.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    sport: String,
    startTime: String,
    endTime:String,
    coach: String,
    
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;