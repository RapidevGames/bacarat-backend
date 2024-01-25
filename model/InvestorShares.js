const mongoose = require("mongoose");

const history = new mongoose.Schema({
  investor_Shares: { type: Number, default: 0, min: 0 },
  per_Share_Cost: { type: Number, default: 0, min: 0 },
  total_investment: { type: Number, default: 0, min: 0 },
  table_ID: { type: mongoose.Schema.Types.ObjectId, ref: "gameTable" },
  DateTime: { type: Date, default: Date.now },
  MetaMask_TX: { type: String },
});

const InvestorSchema = new mongoose.Schema({
  address: { type: String, required: true },
  InvestedShares: { type: Number, default: 0 },
  History: [history],
});

const InvestorSharesSchema = new mongoose.Schema({
  TableID: { type: mongoose.Schema.Types.ObjectId, ref: "gameTable" },
  investors: [InvestorSchema],
});
const InvestorShares = mongoose.model("InvestorShares", InvestorSharesSchema);

module.exports = InvestorShares;
