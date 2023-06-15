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
  actual_price: {
    type: String,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
  fecha_hora: {
    type: String,
    required: true,
  },
  prices: {
    type: Array,
  },
});

module.exports = mongoose.model("Juego", JuegoSchema);
