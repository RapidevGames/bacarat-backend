const ethers = require("ethers");
const cccABI = require("../../contractAbi/CCC.json");
require("dotenv").config();

const CCCAddress = process.env.CCC_CONTRACT_ADDRESS;
const infuraApiKey = process.env.Infura_Private_Key;

class TokenTransferController {
  constructor(privateKey, recipientAddress, amountToSend) {
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = ethers.utils.parseUnits(amountToSend.toString(), 8); // converting amount to Wei

    const infuraUrl = `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`;
    this.provider = new ethers.providers.JsonRpcProvider(infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.tokenContract = new ethers.Contract(CCCAddress, cccABI, this.wallet);
  }

  async checkBalance() {
    try {
      const balance = await this.tokenContract.balanceOf(this.wallet.address);
      console.log("CCC Token Balance:", ethers.utils.formatUnits(balance, 8));
    } catch (error) {
      console.error("Error checking balance:", error.message);
    }
  }

  async checkMaticBalance() {
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

  async transferTokensAPI(req, res) {
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

      res.json({
        success: true,
        message: "Tokens transferred successfully.",
        TransectionHash: `${tx.hash}`,
      });
    } catch (error) {
      console.error("Error transferring CCC tokens:", error.message);
      res
        .status(500)
        .json({
          success: false,
          message: "Error transferring tokens.",
          error: error.message,
        });
    }
  }
}

module.exports = TokenTransferController;
