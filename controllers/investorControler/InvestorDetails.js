const InvestorShares = require("../../model/InvestorShares");

const getInvestorDetails = (gameTable, investorAddress) => {
  const uniqueInvestorAddresses = new Set();
  const investorDetailsMap = new Map();

  gameTable.investors.forEach((investor) => {
    if (
      investor.address === investorAddress &&
      !uniqueInvestorAddresses.has(investor.address)
    ) {
      uniqueInvestorAddresses.add(investor.address);

      const overallInvestment = investor.InvestedShares;

      const totalCoins = gameTable.TableID.Based_Token;
      const remainCoins = gameTable.TableID.Running_Token;
      const pnl = (remainCoins - totalCoins) / 100;
      const investorCommision = gameTable.TableID.investor_ProfitPercentage;
      const investorPNL = (pnl * investorCommision) / 100;

      investorDetailsMap.set(investor.address, {
        table_ID: gameTable.TableID._id,
        table_name: gameTable.TableID.table_ID,
        tableStatus: gameTable.TableID.status,
        remainingShares: gameTable.TableID.Remaining_Shares,
        totalCCCBalance: gameTable.TableID.Based_Token,
        runningCCCBalance: gameTable.TableID.Running_Token,
        investorCommission: investorCommision,
        pnl: pnl,
        investorPNL: investorPNL,
        tableProfitPercentage: gameTable.TableID.Table_profit_Percentage,
        _id: investor._id,
        investor_Address: investor.address,
        totalInvestorShares: overallInvestment,
        per_Share_Cost:
          investor.History.length > 0 ? investor.History[0].per_Share_Cost : 0,
        overallMyInvestment:
          overallInvestment *
          (investor.History.length > 0
            ? investor.History[0].per_Share_Cost
            : 0),
        History: investor.History,
      });
    }
  });

  return Array.from(investorDetailsMap.values());
};

const getInvestorRecords = async (req, res) => {
  try {
    const Address = req.params.Address;

    // Check if Address is provided
    if (!Address) {
      return res.status(400).json({ error: "Address is required" });
    }

    // Extract investor address from the parameters
    const investor_Address = Address;

    // Find all investor shares and populate the 'TableID' field
    const allInvestorShares = await InvestorShares.find().populate("TableID");

    // Check if any investor shares are found
    if (!allInvestorShares || allInvestorShares.length === 0) {
      console.log("No investor shares found");
      return res.status(404).json({ error: "No investor shares found" });
    }

    // Extract investor details from all investor shares based on the provided address
    const MyDetails = allInvestorShares.reduce(
      (acc, investorShares) => [
        ...acc,
        ...getInvestorDetails(investorShares, investor_Address),
      ],
      []
    );

    // Return the details in the response
    if (MyDetails.length > 0) {
      return res.status(200).json({
        MyDetails,
      });
    }

    // If no matching records are found
    console.log("No matching records found");
    return res.status(404).json({ error: "No matching records found" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getInvestorRecords };
