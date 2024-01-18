const ethers = require('ethers');
const crypto = require('crypto');

const createCryptoWallet = (req, res) => {
  // Create a new Ethereum wallet
  const wallet = ethers.Wallet.createRandom();

  // For demonstration purposes only! Do not expose private keys in a production environment.
  // You may want to store private keys securely in a production environment.

  // Create a passphrase (you might want to securely handle passphrase creation and storage)
  const passphrase = 'your_secure_passphrase';

  // Generate a random initialization vector (iv)
  const iv = crypto.randomBytes(16);

  // Ensure the key length is appropriate for AES-256-CBC (32 bytes)
  const key = crypto.scryptSync(passphrase, 'salt', 32);

  // Encrypt the private key
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedPrivateKey = cipher.update(wallet.privateKey, 'utf-8', 'hex');
  encryptedPrivateKey += cipher.final('hex');

  // Decrypt the private key (for demonstration purposes only)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedPrivateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf-8');
  decryptedPrivateKey += decipher.final('utf-8');

  // Construct the response with the encrypted and decrypted private key
  const response = {
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
    encryptedPrivateKey: encryptedPrivateKey,
    decryptedPrivateKey: decryptedPrivateKey,
  };

  // Return the mnemonic, wallet address, encrypted, and decrypted private key
  res.json(response);
};

const retrieveWalletFromMnemonic = (req, res) => {
  try {
    // Get the mnemonic from the request body
    const { mnemonic } = req.body;
console.log(mnemonic);
    // Create a wallet from the provided mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
// For demonstration purposes only! Do not expose private keys in a production environment.
  // You may want to store private keys securely in a production environment.

  // Create a passphrase (you might want to securely handle passphrase creation and storage)
  const passphrase = 'your_secure_passphrase';

  // Generate a random initialization vector (iv)
  const iv = crypto.randomBytes(16);

  // Ensure the key length is appropriate for AES-256-CBC (32 bytes)
  const key = crypto.scryptSync(passphrase, 'salt', 32);

  // Encrypt the private key
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedPrivateKey = cipher.update(wallet.privateKey, 'utf-8', 'hex');
  encryptedPrivateKey += cipher.final('hex');

  // Decrypt the private key (for demonstration purposes only)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedPrivateKey = decipher.update(encryptedPrivateKey, 'hex', 'utf-8');
  decryptedPrivateKey += decipher.final('utf-8');

  // Construct the response with the encrypted and decrypted private key
  const response = {
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
    encryptedPrivateKey: encryptedPrivateKey,
    decryptedPrivateKey: decryptedPrivateKey,
  };

    // Construct the response with the wallet address
    // const response = {
    //   address: wallet.address,
    // };

    // Return the wallet address
    res.json(response);
  } catch (error) {
    console.error("Error retrieving wallet from mnemonic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  createCryptoWallet,
  retrieveWalletFromMnemonic
};
