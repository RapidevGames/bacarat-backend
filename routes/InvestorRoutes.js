const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorControler/investorTablesRecords");
const withDrawRequest = require("../controllers/investorControler/investorWitdraw");
const buySharesController = require("../controllers/investorControler/buyTableShare");
const {
  getInvestorRecords,
} = require("../controllers/investorControler/InvestorDetails");
const buyTableSharesWithMetaMask = require("../controllers/investorControler/buyShareWithMetamask");

// Route for fetching records based on the identifier
router.get("/TableRecords/:tableID", investorController.getRecords);
// Investor Recorsd
router.get("/InvestorRecods/:Address", getInvestorRecords);

// Route for making withdrawal requests
router.post("/withdrawRequest", withDrawRequest.makeWithdrawalRequest);

// Route for buying table shares
router.post("/buyShares", buySharesController);
router.post("/buyShareswithMetaMask", buyTableSharesWithMetaMask);

module.exports = router;
