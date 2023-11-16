// controllers/walletController.js
const ethers = require('ethers');

const createCryptoWallet = (req, res) => {
  // Create a new Ethereum wallet
  const wallet = ethers.Wallet.createRandom();

  // Return the private key, mnemonic, and wallet address
  res.json({
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
  });
};

module.exports = {
  createCryptoWallet,
};
