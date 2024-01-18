const express = require("express");
const CCCTokenTransferController = require("../controllers/transectionControler/cccTransferControler");
const USDTTransferController = require("../controllers/transectionControler/usdtTransferControler");
const MaticTransferController = require("../controllers/transectionControler/maticTransferControler");
const router = express.Router();

router.post("/transferTokensCCC", (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const infuraApiKey = "b1f33be1c1844b388461c085b20c0ef9";
    const CCCAddress = "0x0c39c858f0F83c6DfFe5567828eAf85A060dd140";

    const tokenController = new CCCTokenTransferController(
      privateKey,
      recipientAddress,
      amountToSend,
      CCCAddress,
      infuraApiKey
    );

    tokenController.transferTokensAPI(req, res);
  } catch (error) {
    console.error("Error transferring CCC tokens:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error transferring CCC tokens.",
        error: error.message,
      });
  }
});

router.post("/transferTokensUSDT", (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const infuraApiKey = "b1f33be1c1844b388461c085b20c0ef9";
    const USDTAddress = "0xYourUSDTContractAddress"; // Replace with the actual address of the USDT contract

    const usdtController = new USDTTransferController(
      privateKey,
      recipientAddress,
      amountToSend,
      USDTAddress,
      infuraApiKey
    );

    usdtController.transferTokensAPI(req, res);
  } catch (error) {
    console.error("Error transferring USDT tokens:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error transferring USDT tokens.",
        error: error.message,
      });
  }
});

router.post("/transferMATIC", (req, res) => {
  const { privateKey, recipientAddress, amountToSend } = req.body;

  try {
    const maticController = new MaticTransferController(
      privateKey,
      recipientAddress,
      amountToSend
    );

    maticController.transferMaticAPI(req, res);
  } catch (error) {
    console.error("Error transferring MATIC:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error transferring MATIC.",
        error: error.message,
      });
  }
});

module.exports = router;
