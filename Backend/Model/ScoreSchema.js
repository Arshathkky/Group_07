const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    sportName:String,
    teamoneName:String,
    teamoneScore:Number,
    teamtwoName:String,
    teamtwoScore:Number,
    teamoneplayeroneName:String,
    teamoneplayeroneScore:Number,
    teamoneplayertwoName:String,
    teamoneplayertwoScore:Number,
    teamtwoplayeroneName:String,
    teamtwoplayeroneScore:Number,
    teamtwoplayertwoName:String,
    teamtwoplayertwoScore:Number,
});

const SportModel = mongoose.model("scores", sportSchema);

module.exports = SportModel;
