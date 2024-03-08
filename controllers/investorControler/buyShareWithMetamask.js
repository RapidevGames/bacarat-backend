const ContractGameTable = require("../../model/GameTable");
const InvestorShares = require("../../model/InvestorShares");

const updateInvestorShares = async (gameTable, investorAddress, shareCost) => {
  try {
    if (!investorAddress) {
      throw new Error("investorAddress is required.");
    }

    let investorShare = await InvestorShares.findOne({
      TableID: gameTable._id,
    });

    if (!investorShare) {
      investorShare = new InvestorShares({
        TableID: gameTable._id,
        investors: [
          {
            address: investorAddress,
            InvestedShares: shareCost,
            History: [
              {
                investor_Shares: shareCost,
                per_Share_Cost: gameTable.per_Share_Cost,
                total_investment: shareCost * gameTable.per_Share_Cost,
                DateTime: new Date(),
                MetaMask_TX: null, // Add your logic to get MetaMask_TX
              },
            ],
          },
        ],
      });

      gameTable.investors.push(investorShare);
    } else {
      const existingInvestor = investorShare.investors.find(
        (investor) => investor.address === investorAddress
      );

      if (existingInvestor) {
        existingInvestor.InvestedShares += shareCost;
        existingInvestor.History.push({
          investor_Shares: shareCost,
          per_Share_Cost: gameTable.per_Share_Cost,
          total_investment: shareCost * gameTable.per_Share_Cost,
          DateTime: new Date(),
          MetaMask_TX: null, // Add your logic to get MetaMask_TX
        });
      } else {
        investorShare.investors.push({
          address: investorAddress,
          InvestedShares: shareCost,
          History: [
            {
              investor_Shares: shareCost,
              per_Share_Cost: gameTable.per_Share_Cost,
              total_investment: shareCost * gameTable.per_Share_Cost,
              DateTime: new Date(),
              MetaMask_TX: null, // Add your logic to get MetaMask_TX
            },
          ],
        });
      }
    }

    await investorShare.save();
  } catch (error) {
    console.error("Error updating investor shares:", error.message);
    throw new Error("Error updating investor shares");
  }
};

const updateGameTableShares = async (gameTable, sharesToBuy) => {
  gameTable.total_Investor_Seats += sharesToBuy;
  gameTable.Remaining_Shares -= sharesToBuy;
  await gameTable.save();
};

const buyShares = async (gameTable, sharesToBuy, investorAddress, txID) => {
  try {
  
    // Add logic to validate the provided transaction ID if needed

    await updateInvestorShares(gameTable, investorAddress, sharesToBuy);

    await updateGameTableShares(gameTable, sharesToBuy);

    // Check if the investor has already bought shares in this table
    let existingInvestorShares = await InvestorShares.findOne({
      "investors.address": investorAddress,
      TableID: gameTable._id,
    });

    console.log("Shares processed successfully!");
  } catch (error) {
    console.error("Error processing shares:", error.message);
    throw new Error("Error processing shares");
  }
};
const buyTableSharesWithMetaMask = async (req, res) => {
  try {
    const { table_ID, sharesToBuy, investor_Address, txID } = req.body;

    const gameTable = await ContractGameTable.findOne({ _id: table_ID });
    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    await buyShares(gameTable, sharesToBuy, investor_Address, txID, res);

    res.status(201).json({ message: "Shares processed successfully!" });
  } catch (error) {
    console.error("Error processing table shares:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = buyTableSharesWithMetaMask;
