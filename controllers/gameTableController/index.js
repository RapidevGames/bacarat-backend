// controllers/gameTableController.js
const ContractGameTable = require("../../model/GameTable");
const Gamer = require("../../model/gamer");
const Investor = require("../../model/investor");

const createGameTable = async (req, res) => {
  try {
    const {
      table_ID,
      total_Investor_Seats,
      per_Share_Cost,
      winners_Rewards,
      bet_Size,
      Bankers_Address,
      Region,
      status,
      Running_Token,
      Based_Token,
      Stop_Loss,
    } = req.body;

    // Validate input parameters (you can add more validation based on your requirements)
    if (
      !table_ID ||
      !total_Investor_Seats ||
      !per_Share_Cost ||
      !winners_Rewards ||
      !bet_Size ||
      !Bankers_Address ||
      !Region
    ) {
      return res
        .status(400)
        .json({ error: "Invalid input parameters. All fields are required." });
    }

    // Check if the table with the given table_ID already exists
    const existingTable = await ContractGameTable.findOne({ table_ID });
    if (existingTable) {
      return res
        .status(409)
        .json({ error: "A game table with the same table_ID already exists." });
    }

    // Create a new game table
    const Remaining_Shares = total_Investor_Seats;
    const newGameTable = new ContractGameTable({
      table_ID,
      total_Investor_Seats,
      Remaining_Shares,
      per_Share_Cost,
      winners_Rewards,
      bet_Size,
      Bankers_Address,
      Region,
      status,
      Running_Token,
      Based_Token,
      Stop_Loss,
    });

    await newGameTable.save();

    res
      .status(201)
      .json({
        message: "Game table created successfully!",
        table_ID: newGameTable._id,
      });
  } catch (error) {
    console.error("Error creating game table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createGameTable,
};
