// models/WithdrawalRequest.js
const mongoose = require("mongoose");

const withdrawalRequestSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  withdrawGameCoins: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    required: true,
  },
  adminAddress: {
    type: String,
    default: null,
  },
  User: {
    type: String,
    enum: ["Gamer", "Invetor"],
    default: "Gamer",
  },
});

const WithdrawalRequest = mongoose.model(
  "Withdrawal_Request",
  withdrawalRequestSchema
);

module.exports = WithdrawalRequest;
