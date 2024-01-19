const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorControler/investorTablesRecords");
const buySharesController = require("../controllers/investorControler/buyTableShare");

// Route for fetching records based on the identifier
router.get("/records/:identifier", investorController.getRecords);

// Route for making withdrawal requests
router.post("/withdrawRequest", investorController.makeWithdrawalRequest);

// Route for buying table shares
router.post("/buyShares", buySharesController);

module.exports = router;
