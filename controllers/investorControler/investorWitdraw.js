const ContractGameTable = require("../../model/GameTable");
const { validationResult } = require("express-validator");
const WithdrawalRequest = require("../../model/WithdrawalRequest");
const InvestorShares = require("../../model/InvestorShares");

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
  makeWithdrawalRequest,
};
