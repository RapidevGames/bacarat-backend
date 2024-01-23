const ContractGameTable = require("../../model/GameTable");

const getInvestorRecords = async (req, res) => {
  try {
    const Address = req.params.Address;

    // Check if Address is provided
    if (!Address) {
      return res.status(400).json({ error: "Address is required" });
    }

    // Extract investor address from the parameters
    const investor_Address = Address;

    // Function to get investor details
    // const getInvestorDetails = (gameTable) => {
    //   const matchingInvestors = gameTable.investors.filter(
    //     (investor) => investor.investor_Address === investor_Address
    //   );

    //   return matchingInvestors.map((investor) => ({
    //     table_ID: gameTable.table_ID,
    //     Table_per_Share_Cost: gameTable.per_Share_Cost,
    //     Table_profit_Percentage: gameTable.Table_profit_Percentage,
    //     _id: investor._id,
    //     investor_Address: investor.investor_Address,
    //     investor_Shares: investor.investor_Shares,
    //     per_Share_Cost: investor.per_Share_Cost,
    //     total_investment: investor.total_investment,
    //   }));
    // };
    const getInvestorDetails = (gameTable) => {
      const uniqueInvestorAddresses = new Set();
      const investorDetailsMap = new Map(); // Map to store total investor shares per address

      gameTable.investors.forEach((investor) => {
        if (
          investor.investor_Address === investor_Address &&
          !uniqueInvestorAddresses.has(investor.investor_Address)
        ) {
          uniqueInvestorAddresses.add(investor.investor_Address);

          const totalInvestorShares = gameTable.investors
            .filter((inv) => inv.investor_Address === investor.investor_Address)
            .reduce((total, inv) => total + inv.investor_Shares, 0);

          const totalCoins = gameTable.Based_Token;
          const RemainCoins = gameTable.Running_Token;
          // calculate the Table Profit or Loss
          const PNL = (RemainCoins - totalCoins) / 100;
          //  Claculate the Investors Profit & Loss
          const invesstorCommision = gameTable.investor_ProfitPercentage;
          const InvestorPNL = (PNL * invesstorCommision) / 100;
          // Display data
          investorDetailsMap.set(investor.investor_Address, {
            table_ID: gameTable.table_ID,
            TableStatus: gameTable.status,
            Remaing_Share: gameTable.Remaining_Shares,
            Total_CCC_Balace: gameTable.Based_Token,
            Running_CCC_Balace: gameTable.Running_Token,
            InvestorCommsion: invesstorCommision,
            PNL: PNL,
            InvestorPNL: InvestorPNL,

            Table_profit_Percentage: gameTable.Table_profit_Percentage,
            _id: investor._id,
            investor_Address: investor.investor_Address,
            total_investor_Shares: totalInvestorShares,
            per_Share_Cost: investor.per_Share_Cost,
            total_investment: investor.total_investment,
            InvestorDetails: gameTable.investors,
          });
        }
      });

      return Array.from(investorDetailsMap.values());
    };

    // Find all game tables and populate the 'investors' field for each table
    const allGameTables = await ContractGameTable.find().populate("investors");

    // Check if any game tables are found
    if (!allGameTables || allGameTables.length === 0) {
      return res.status(404).json({ error: "No game tables found" });
    }

    // Extract investor details from all game tables based on the provided address
    const MyDetails = allGameTables.reduce(
      (acc, gameTable) => [...acc, ...getInvestorDetails(gameTable)],
      []
    );

    // Return the details in the response
    if (MyDetails.length > 0) {
      return res.status(200).json({
        MyDetails,
      });
    }

    // If no matching records are found
    return res.status(404).json({ error: "No matching records found" });
  } catch (error) {
    res.status(500).json({ error: "No record Found" });
  }
};

module.exports = { getInvestorRecords };
