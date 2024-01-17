const mongoose = require('mongoose')
const newsSchema = new mongoose.Schema({
    title:String,
    catagary:String,
    body:String,
})

const News = mongoose.model('news',newsSchema);

module.exports = News