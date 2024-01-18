const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  investor_Address: { type: String, required: true },
  investor_Shares: { type: Number, default: 0, min: 0 },
  per_Share_Cost: { type: Number, default: 0, min: 0 },
  total_investment: { type: Number, default: 0, min: 0 },
  table_ID: { type: mongoose.Schema.Types.ObjectId, ref: "gameTable" },
});

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
