const express = require("express");
const walletBalanceController = require("../controllers/walletBalanceController");

const router = express.Router();

router.get("/:address", async (req, res) => {
  const { address } = req.params;

  try {
    const balances = await walletBalanceController.getWalletBalance(address);
    res.json(balances);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack,
        config: error.config,
        code: error.code,
        status: error.response?.status,
      },
    });
  }
});

module.exports = router;
