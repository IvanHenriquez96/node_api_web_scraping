const mongoose = require("mongoose");

const JuegoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url_game: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
  timestamps: {
    type: String,
    required: true,
  },
  prices: {
    type: Array,
  },
});

module.exports = mongoose.model("Juego", JuegoSchema);
