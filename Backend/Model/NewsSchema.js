const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  body: { type: String, required: true },
  photo: { type: String, required: true }
});

module.exports = mongoose.model('News', NewsSchema);
