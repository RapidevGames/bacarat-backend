const express = require("express");
const GameCoinController = require("../../controllers/CoinsConversionController/getGamePoints");

const dotenv = require("dotenv");
const router = express.Router();

// Load environment variables from .env file
dotenv.config();

router.post("/Convert-CCC-to-GameCoin", async (req, res) => {
  const { privateKey, amountToSend } = req.body;

  try {
    const infuraApiKey = process.env.Infura_Private_Key;
    const CCCAddress = process.env.CCC_CONTRACT_ADDRESS;
    const recipientAddress = process.env.RECIPIENT_ADDRESS; // Update with your logic

    const gameController = new GameCoinController.GameCoinController(
      privateKey,
      recipientAddress,
      amountToSend,
      CCCAddress,
      infuraApiKey
    );

    // Transfer CCC tokens to another wallet
    await gameController.transferTokensAPI(req, res);

    return res.json({
      success: true,
      message: "CC tokens transferred and game points updated successfully.",
    });
  } catch (error) {
    console.error(
      "Error transferring CCC tokens and updating game points:",
      error.message
    );
    res.status(500).json({
      success: false,
      message: "Error transferring CCC tokens and updating game points.",
      error: error.message,
    });
  }
});

// Create an instance of the controller
const gameCoinBalanceController =
  new GameCoinController.GameCoinBalanceController();

// Endpoint to fetch game coin balance
router.get("/GameCoinBalance/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const result = await gameCoinBalanceController.getGameCoinBalance(
      walletAddress
    );

    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error in getGameCoinBalance route:", error);
    res.status(500).json(error);
  }
});

module.exports = router;
