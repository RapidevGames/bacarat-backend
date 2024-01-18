// models/gameTable.js
const mongoose = require("mongoose");

const gameTableSchema = new mongoose.Schema({
  table_ID: { type: String, required: true },
  total_Investor_Seats: { type: Number },
  Remaining_Shares: { type: Number, default: 0 },
  per_Share_Cost: { type: Number },
  winners_Rewards: { type: Number, default: 0 },
  bet_Size: { type: Number },
  Bankers_Address: { type: String },
  gamers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Gamer" }],
  investors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Investor" }],
  status: { type: String, default: "active" },
  Region: { type: String, required: true },
});

const ContractGameTable = mongoose.model("gameTable", gameTableSchema);

module.exports = ContractGameTable;
