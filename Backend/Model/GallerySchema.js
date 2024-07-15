const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: function() { return this.category === 'achievement'; } // Required for achievements
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
