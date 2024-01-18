const ContractGameTable = require("../../model/GameTable");
const Investor = require("../../model/investor");

const buyTableShares = async (req, res) => {
  try {
    const { table_ID, sharesToBuy, investor_Address } = req.body;
    console.log("======================");
    console.log(table_ID, sharesToBuy, investor_Address);
    console.log("======================");
    // Validate inputs (you can customize the validation logic based on your requirements)
    if (!table_ID || !sharesToBuy || !investor_Address) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Find the game table by table_ID
    const gameTable = await ContractGameTable.findById(table_ID);

    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    const tableData = gameTable._id.map( (table_ID) => ({
      _id: table_ID,
    }));    
    console.log('---------------------------');
    console.log(tableData);
    console.log('---------------------------');

    const shareCost = gameTable.per_Share_Cost;
    console.log(gameTable.per_Share_Cost);

    // Save investor's address and the number of shares they bought
    const investor = new Investor({
      investor_Address: investor_Address,
      table_id: gameTable._id,
      investor_Shares: sharesToBuy,
      per_Share_Cost: gameTable.per_Share_Cost,
      //   total_investment: sharesToBuy * gameTable.per_Share_Cost,
    });

    await investor.save();
    console.log(investor);

    // Update the total number of shares in the game table
    // gameTable.total_Investor_Seats += sharesToBuy;
    // await gameTable.save();

    res.status(201).json({ message: "Shares bought successfully!" });
  } catch (error) {
    // console.error("Error buying table shares:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { buyTableShares };
