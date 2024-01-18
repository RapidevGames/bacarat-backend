const express = require("express");
const router = express.Router();
// const investorController = require("../controllers/investorControler/investorTablesRecords");
const buySharesController = require("../controllers/investorControler/buyTableShare");

// Define the route for buying table shares
// router.post('/buy-table-shares', investorController.buyTableShares);
router.post("/buyShares", buySharesController);

module.exports = router;
