const mongoose = require("mongoose");

const InvestorSchema = new mongoose.Schema({
  address: { type: String, required: true },
  InvestedShares: { type: Number, default: 0 },
});

const InvestorSharesSchema = new mongoose.Schema({
  TableID: { type: mongoose.Schema.Types.ObjectId, ref: "gameTable" },
  investors: [InvestorSchema],
});
const InvestorShares = mongoose.model("InvestorShares", InvestorSharesSchema);

module.exports = InvestorShares;
