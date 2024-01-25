const mongoose = require("mongoose");
const ContractGameTable = require("../../model/GameTable");
const { validationResult } = require("express-validator");
const WithdrawalRequest = require("../../model/WithdrawalRequest");
const InvestorShares = require("../../model/InvestorShares");

const getRecords = async (req, res) => {
  try {
    const tableID = req.params.tableID;
    console.log(tableID);
    // Check if tableID is provided
    if (!tableID) {
      return res.status(400).json({ error: "Table ID is required" });
    }

    // Query the ContractGameTable model based on the tableID
    const gameTable = await ContractGameTable.findOne({ _id: tableID });

    // Check if the game table record is found
    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    // Return the game table details in the response
    return res.status(200).json({
      gameTable: gameTable,
    });
  } catch (error) {
    console.error("Error getting records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRecords,
};
