const ethers = require('ethers');
require('dotenv').config();

class MaticTransferController {
  constructor(privateKey, recipientAddress, amountToSend) {
    this.privateKey = privateKey;
    this.recipientAddress = recipientAddress;
    this.amountToSend = ethers.utils.parseEther(amountToSend);

    this.infuraApiKey = process.env.Infura_Private_Key;
    this.infuraUrl = `https://polygon-mainnet.infura.io/v3/${this.infuraApiKey}`;
    this.provider = new ethers.providers.JsonRpcProvider(this.infuraUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
  }

  async checkMaticBalance() {
    try {
      const maticBalance = await this.wallet.getBalance();
      console.log("MATIC Balance:", ethers.utils.formatUnits(maticBalance, 'ether'));
    } catch (error) {
      console.error("Error checking MATIC balance:", error.message);
    }
  }

  async transferMaticAPI(req, res) {
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
        throw new Error("Insufficient MATIC funds for the transaction. Please add MATIC to cover gas fees.");
      }

      const tx = {
        to: this.recipientAddress,
        value: this.amountToSend,
        gasPrice: gasPrice,
        nonce: nonce,
        chainId: 137, // 137 is the chainId for Polygon mainnet
      };

      const signedTx = await this.wallet.signTransaction(tx);

      // Use the correct provider instance when sending the transaction
      const sentTx = await this.wallet.sendTransaction(signedTx);

      console.log("Transaction Hash:", sentTx.hash);

      await this.checkMaticBalance();

      res.json({ success: true, message: 'MATIC transferred successfully.', TransactionHash: `${sentTx.hash}` });
    } catch (error) {
      console.error("Error transferring MATIC:", error.message);
      res.status(500).json({ success: false, message: 'Error transferring MATIC.', error: error.message });
    }
  }
}

module.exports = MaticTransferController;
