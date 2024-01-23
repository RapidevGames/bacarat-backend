const express = require("express");
const {
  getTransactionsList,
} = require("../../controllers/transectionHistoryControler");

const router = express.Router();

router.get("/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Wallet address is required." });
  }

  try {
    await getTransactionsList(walletAddress, res); // Use the correct function name
  } catch (error) {
    console.error("Error fetching Polygon transactionsHistory:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching Polygon transactionsHistory.",
      error: error.message,
    });
  }
});

module.exports = router;
