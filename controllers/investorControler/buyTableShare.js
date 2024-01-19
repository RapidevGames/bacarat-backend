const { ethers } = require("ethers");
const ContractGameTable = require("../../model/GameTable");
const Investor = require("../../model/investor");
const InvestorShares = require("../../model/InvestorShares");
const USDTContractABI = require("../../contractAbi/USDT.json");
const Infura_URL_Polygone = process.env.Infura_URL_Polygone;

const provider = new ethers.providers.JsonRpcProvider(Infura_URL_Polygone);

const createWallet = (privateKey) => {
  try {
    return new ethers.Wallet(privateKey, provider);
  } catch (error) {
    console.error("Error creating wallet:", error.message);
    throw new Error("Invalid private key");
  }
};

const getTokenContract = (wallet) => {
  return new ethers.Contract(
    process.env.USDT_CONTRACT_ADDRESS,
    USDTContractABI,
    wallet
  );
};

const checkBalance = async (wallet) => {
  try {
    const balance = await wallet.provider.getBalance(wallet.address);
    console.log("Wallet Balance:", ethers.utils.formatEther(balance));
    return balance;
  } catch (error) {
    console.error("Error checking balance:", error.message);
    throw new Error("Error checking balance");
  }
};

const buyShares = async (
  wallet,
  tokenContract,
  gameTable,
  sharesToBuy,
  investorAddress
) => {
  const SharewithCost = sharesToBuy * 1 * 1000000;

  const gasPrices = await provider.getGasPrice();
  const gasPrice = gasPrices.mul(10);

  const nonce = await provider.getTransactionCount(wallet.address);
  const gasLimit = 300000;
  // customize based on your contract method
  const transferToBankerTx = await tokenContract.transfer(
    gameTable.Bankers_Address,
    SharewithCost,
    { gasPrice, nonce, gasLimit }
  );

  await transferToBankerTx.wait();
  console.log("TX : ", transferToBankerTx.hash);
  console.log(
    `USDT transferred to banker's address: ${transferToBankerTx.hash}`
  );
};

const updateInvestorShares = async (gameTable, investorAddress, shareCost) => {
  let InvestorShare = await InvestorShares.findOne({
    TableID: gameTable._id,
  });

  if (InvestorShare) {
    const existingInvestor = InvestorShare.investors.find(
      (investor) => investor.address === investorAddress
    );

    if (existingInvestor) {
      // If the investor already exists, update the InvestedShares
      existingInvestor.InvestedShares += shareCost;
    } else {
      // If the investor does not exist, create a new record
      InvestorShare.investors.push({
        address: investorAddress,
        InvestedShares: shareCost,
      });
    }

    await InvestorShare.save();
  } else {
    // If there is no InvestorShare record, create a new one and add the investor
    const investor = new InvestorShares({
      TableID: gameTable._id,
      investors: [{ address: investorAddress, InvestedShares: shareCost }],
    });

    await investor.save();
    gameTable.investors.push(investor);
    await gameTable.save();
  }
};

const updateGameTableShares = async (gameTable, sharesToBuy) => {
  gameTable.total_Investor_Seats += sharesToBuy;
  gameTable.Remaining_Shares -= sharesToBuy;
  await gameTable.save();
};

const buyTableShares = async (req, res) => {
  try {
    const { table_ID, sharesToBuy, investor_Address, private_Key } = req.body;

    const wallet = createWallet(private_Key);
    const tokenContract = getTokenContract(wallet);

    const gameTable = await ContractGameTable.findOne({ _id: table_ID });

    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    const balance = await checkBalance(wallet);
    const formattedBalance = ethers.utils.formatUnits(balance, "wei");
    const BigNumber = ethers.BigNumber.from(formattedBalance);

    console.log("USDT Token Balance:", formattedBalance);

    const SharewithCost = sharesToBuy * 1 * 1000000;
    const ccctokens = sharesToBuy * gameTable.per_Share_Cost;
    console.log("Required Amount:", SharewithCost.toString());

    if (BigNumber.gte(SharewithCost)) {
      await buyShares(
        wallet,
        tokenContract,
        gameTable,
        sharesToBuy,
        investor_Address
      );
      await updateInvestorShares(gameTable, investor_Address, ccctokens);
      await updateGameTableShares(gameTable, sharesToBuy);

      // Check if the investor has already bought shares in this table
      let existingInvestor = await Investor.findOne({
        investor_Address: investor_Address,
        table_ID: table_ID,
      });

      // Update the share investor updating and creating records
      await updateInvestorShares(gameTable, investor_Address, ccctokens);

      if (existingInvestor) {
        // If the investor already exists, update the quantity and total investment
        existingInvestor.investor_Shares += sharesToBuy;
        existingInvestor.total_investment +=
          sharesToBuy * gameTable.per_Share_Cost;

        // Save the changes to the investor record
        await existingInvestor.save();

        const find = gameTable.investors.find(
          (investor) => investor == existingInvestor._id
        );

        if (!find) {
          gameTable.investors.push(existingInvestor);
          await gameTable.save();
        }
      } else {
        // Calculate the total cost for the investor
        const totalCost = sharesToBuy * gameTable.per_Share_Cost;

        // Save investor's address and the number of shares they bought
        const investor = new Investor({
          investor_Address: investor_Address,
          table_ID: table_ID,
          investor_Shares: sharesToBuy,
          per_Share_Cost: gameTable.per_Share_Cost,
          total_investment: totalCost,
        });

        await investor.save();
        gameTable.investors.push(investor);
        await gameTable.save();
      }

      res.status(201).json({ message: "Shares bought successfully!" });
    } else {
      console.error("Insufficient balance to buy shares.");
      return res
        .status(400)
        .json({ error: "Insufficient balance to buy shares" });
    }
  } catch (error) {
    const message = error.message?.includes("insufficient funds")
      ? "insufficient funds for intrinsic transaction"
      : null;
    console.error("Error buying table shares:", error.message);
    res.status(500).json({
      error: `${message ? message : error.message}`,
    });
  }
};

module.exports = buyTableShares;
