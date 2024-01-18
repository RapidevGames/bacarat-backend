const ethers = require("ethers");
const cccABI = require("../../contractAbi/CCC.json");
require("dotenv").config();
const CCCAddress = process.env.CCC_CONTRACT_ADDRESS;
const infuraApiKey = process.env.Infura_Private_Key;

const User = require("../../model/gamePoint");

class GameCoinController {
  constructor(privateKey, recipientAddress, amountToSend) {
    // Constructor initializes key properties needed for token transfer and user update
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = amountToSend * 100000000;

    // Ethereum provider setup for interacting with the blockchain
    this.infuraUrl = `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`;
    this.provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.tokenContract = new ethers.Contract(CCCAddress, cccABI, this.wallet);
  }

  async checkBalance() {
    // Check the balance of CCC tokens in the sender's wallet
    try {
      const balance = await this.tokenContract.balanceOf(this.wallet.address);
      console.log("CCC Token Balance:", balance.toString() / 100000000);
    } catch (error) {
      console.error("Error checking balance:", error.message);
    }
  }

  async checkMaticBalance() {
    // Check the balance of MATIC tokens in the sender's wallet
    try {
      const maticBalance = await this.wallet.getBalance();
      console.log(
        "MATIC Balance:",
        ethers.utils.formatUnits(maticBalance, "ether")
      );
    } catch (error) {
      console.error("Error checking MATIC balance:", error.message);
    }
  }

  async getGasPrices() {
    // Get the current gas prices to estimate transaction fees
    try {
      const gasPrices = await this.wallet.getGasPrice();

      console.log("Current Gas Prices (in Gwei):");
      console.log(
        "Lowest Gas Price:",
        ethers.utils.formatUnits(gasPrices.div(2), "gwei")
      );
      console.log(
        "Highest Gas Price:",
        ethers.utils.formatUnits(gasPrices.mul(2), "gwei")
      );
    } catch (error) {
      console.error("Error fetching gas prices:", error.message);
    }
  }

  async addOrUpdateGamePoints(address, gamePoints) {
    // Helper function to add or update user game points in the database
    try {
      // Check if user exists
      const existingUser = await User.findOne({ address });

      if (existingUser) {
        // If user exists, update game points
        existingUser.gamePoints += gamePoints;
        await existingUser.save();
      } else {
        // If user does not exist, create a new user
        const newUser = new User({ address, gamePoints });
        await newUser.save();
      }
    } catch (error) {
      console.error(
        "Error adding or updating user game points:",
        error.message
      );
      throw error;
    }
  }
  async transferTokensAPI(req, res, next) {
    try {
      await this.checkMaticBalance();

      const nonce = await this.wallet.getTransactionCount();
      const gasPrices = await this.wallet.getGasPrice();

      console.log("Gas Prices (Wei):", gasPrices.toString());

      // Adjust the gas price calculation dynamically (increase by 10%)
      const gasPrice = gasPrices.add(gasPrices.div(10));

      console.log("Adjusted Gas Price:", gasPrice.toString());

      const maticBalance = await this.wallet.getBalance();
      const totalGasFeesWei = gasPrice.mul(21000);

      console.log("Total Gas Fees (Wei):", totalGasFeesWei.toString());

      if (maticBalance.lt(totalGasFeesWei.add(this.amountToSend))) {
        throw new Error(
          "Insufficient MATIC funds for the transaction. Please add MATIC to cover gas fees."
        );
      }

      // Use the helper function to add or update user game points
      await this.addOrUpdateGamePoints(
        this.wallet.address,
        this.amountToSend / 100000000
      );

      const tx = await this.tokenContract.transfer(
        this.recipientAddress,
        this.amountToSend,
        {
          gasPrice: gasPrice,
          nonce: nonce,
        }
      );

      await tx.wait();
      console.log("Transaction Hash:", tx.hash);

      await this.checkBalance();
    } catch (error) {
      console.error("Error transferring CCC tokens:", error);

      // Handle specific error: Insufficient MATIC funds
      if (error.message.includes("Insufficient MATIC funds")) {
        return null;
      }
    }
  }
}

class GameCoinBalanceController {
  async getGameCoinBalance(walletAddress) {
    console.log("woking");
    try {
      // Fetch the user's game points from the database
      const user = await User.findOne({ address: walletAddress });

      if (user) {
        return {
          success: true,
          message: "Game coin balance fetched successfully.",
          gamePoints: user.gamePoints,
        };
      } else {
        return {
          success: false,
          message: "User not found.",
        };
      }
    } catch (error) {
      console.error("Error fetching game coin balance:", error.message);
      throw {
        success: false,
        message: "Error fetching game coin balance.",
        error: error.message,
      };
    }
  }
}

module.exports = { GameCoinController, GameCoinBalanceController };
