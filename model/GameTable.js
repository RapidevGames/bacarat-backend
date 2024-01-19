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
  Contract_TimePeriod: {
    StartTime: { type: Date, default: Date.now },
    EndTime: { type: Date, default: Date.now },
  },
  Running_Token: { type: Number, default: 0 },
  Based_Token: { type: Number, default: 0 },
  Stop_Loss: { type: Number, default: 0 },
  DailyProfits: [
    {
      date: { type: Date, default: Date.now },
      totalProfit: { type: Number, default: 0 },
    },
  ],
  WeeklyProfits: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
      totalProfit: { type: Number, default: 0 },
    },
  ],
  MonthlyProfits: [
    {
      month: { type: Number, default: new Date().getMonth() + 1 },
      totalProfit: { type: Number, default: 0 },
    },
  ],
});

const ContractGameTable = mongoose.model("gameTable", gameTableSchema);

module.exports = ContractGameTable;
