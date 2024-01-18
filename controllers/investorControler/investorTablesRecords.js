const ContractGameTable = require("../../model/GameTable");
const Investor = require("../../model/investor");
const { validationResult } = require("express-validator");
const WithdrawalRequest = require("../../model/WithdrawalRequest");
const InvestorShares = require("../../model/InvestorShares");

const getRecords = async (req, res) => {
  try {
    const identifier = req.params.identifier;
    console.log(identifier);

    // Check if identifier is provided
    if (!identifier) {
      return res.status(400).json({ error: "Identifier is required" });
    }

    // Extract investor address or table ID from the parameters
    const investor_Address = identifier;

    // Function to get investor details
    const getInvestorDetails = (gameTable) => {
      const matchingInvestors = gameTable.investors.filter(
        (investor) => investor.investor_Address === investor_Address
      );

      return matchingInvestors.map((investor) => ({
        table_ID: gameTable.table_ID,
        _id: investor._id,
        investor_Address: investor.investor_Address,
        investor_Shares: investor.investor_Shares,
        per_Share_Cost: investor.per_Share_Cost,
        total_investment: investor.total_investment,
      }));
    };

    // Find all game tables and populate the 'investors' field for each table
    const allGameTables = await ContractGameTable.find().populate("investors");

    // Check if any game tables are found
    if (!allGameTables || allGameTables.length === 0) {
      return res.status(404).json({ error: "No game tables found" });
    }

    // Extract investor details from all game tables based on the provided address
    const allInvestorDetails = allGameTables.reduce(
      (acc, gameTable) => [...acc, ...getInvestorDetails(gameTable)],
      []
    );

    // Return the details in the response
    if (allInvestorDetails.length > 0) {
      return res.status(200).json({
        allInvestorDetails,
      });
    }

    // The identifier is assumed to be a table ID
    const table_ID = identifier;
    console.log("table_ID", table_ID);

    // Find the game table by table_ID and populate the 'investors' field
    const gameTable = await ContractGameTable.findById(table_ID).populate(
      "investors"
    );

    // Check if the game table is found
    if (gameTable) {
      // Extract investor details from the populated 'investors' field
      const investorDetails = getInvestorDetails(gameTable);

      // Return the details in the response
      return res.status(200).json({
        table_ID: gameTable.table_ID,
        investorDetails,
      });
    }

    // If no matching records are found
    return res.status(404).json({ error: "No matching records found" });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const makeWithdrawalRequest = async (req, res) => {
  try {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { table_ID, investor_Address, withdrawGameCoins } = req.body;

    // Find the game table by table_ID
    const gameTable = await ContractGameTable.findById(table_ID);

    // Check if the game table is found
    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    // Find the investor record in the InvestorShares model
    const investorShare = await InvestorShares.findOne({
      TableID: gameTable._id,
      "investors.address": investor_Address,
    });

    // Check if the investor record is found
    if (!investorShare) {
      return res
        .status(404)
        .json({ error: "Investor not found for the given table" });
    }

    // Check if there is already a pending withdrawal request for the investor
    const existingPendingRequest = await WithdrawalRequest.findOne({
      address: investor_Address,
      status: "pending",
    });

    if (existingPendingRequest) {
      return res.status(400).json({
        error:
          "There is already a pending withdrawal request for this investor",
      });
    }

    // Calculate total invested shares for the investor
    const totalInvestedShares = investorShare.investors.reduce(
      (total, investor) => total + investor.InvestedShares,
      0
    );

    // Check if the investor has sufficient shares for withdrawal
    if (totalInvestedShares < withdrawGameCoins) {
      return res
        .status(400)
        .json({ error: "Insufficient shares for withdrawal" });
    }

    // Create a withdrawal request
    const withdrawalRequest = new WithdrawalRequest({
      address: investor_Address,
      withdrawGameCoins,
      status: "pending",
    });

    // Save the withdrawal request
    await withdrawalRequest.save();

    // Update the investor's invested shares
    investorShare.investors.forEach((investor) => {
      if (investor.address === investor_Address) {
        investor.InvestedShares -= withdrawGameCoins;
      }
    });

    // Save the updated investorShares
    await investorShare.save();

    res
      .status(201)
      .json({ message: "Withdrawal request submitted successfully!" });
  } catch (error) {
    console.error("Error making withdrawal request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRecords,
  makeWithdrawalRequest,
};
