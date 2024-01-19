const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");

router.get("/create", walletController.createCryptoWallet);
router.post("/retrieve", walletController.retrieveWalletFromMnemonic);

module.exports = router;
