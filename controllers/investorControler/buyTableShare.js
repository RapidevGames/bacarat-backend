const ContractGameTable = require("../../model/GameTable");
const Investor = require("../../model/investor");

const buyTableShares = async (req, res) => {
  try {
    const { table_ID, sharesToBuy, investor_Address } = req.body;

    // Validate inputs
    if (!table_ID || !sharesToBuy || !investor_Address) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Find the game table by table_ID
    const gameTable = await ContractGameTable.findOne({ table_ID });

    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    // Check if the investor has already bought shares in this table
    let existingInvestor = await Investor.findOne({
      investor_Address: investor_Address,
      table_id: gameTable._id,
    });

    if (existingInvestor) {
      // If the investor already exists, update the quantity and total investment
      existingInvestor.investor_Shares += sharesToBuy;
      existingInvestor.total_investment +=
        sharesToBuy * gameTable.per_Share_Cost;

      // Save the changes to the investor record
      await existingInvestor.save();
    } else {
      // Calculate the total cost for the investor
      const totalCost = sharesToBuy * gameTable.per_Share_Cost;

      // Save investor's address and the number of shares they bought
      const investor = new Investor({
        investor_Address: investor_Address,
        table_id: gameTable._id,
        investor_Shares: sharesToBuy,
        per_Share_Cost: gameTable.per_Share_Cost,
        total_investment: totalCost,
      });

      await investor.save();
    }

    // Update the total number of shares and remaining shares in the game table
    gameTable.total_Investor_Seats += sharesToBuy;
    gameTable.Remaining_Shares -= sharesToBuy;

    // Save the changes to the game table
    await gameTable.save();

    res.status(201).json({ message: "Shares bought successfully!" });
  } catch (error) {
    console.error("Error buying table shares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = buyTableShares;
