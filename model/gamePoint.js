const mongoose = require("mongoose");

const gamePointSchema = new mongoose.Schema({
  address: { type: String, required: true },
  gamePoints: { type: Number, default: 0 },
  gamer: { type: mongoose.Schema.Types.ObjectId, ref: 'Gamer' }
});

const GameCoins = mongoose.model("GameCoins", gamePointSchema);

module.exports = GameCoins;
