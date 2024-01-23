const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorControler/investorTablesRecords");
const buySharesController = require("../controllers/investorControler/buyTableShare");
const {
  getInvestorRecords,
} = require("../controllers/investorControler/InvestorDetails");

// Route for fetching records based on the identifier
router.get("/records/:identifier", investorController.getRecords);
// Investor Recorsd
router.get("/InvestorRecods/:Address", getInvestorRecords);

// Route for making withdrawal requests
router.post("/withdrawRequest", investorController.makeWithdrawalRequest);

// Route for buying table shares
router.post("/buyShares", buySharesController);

module.exports = router;
