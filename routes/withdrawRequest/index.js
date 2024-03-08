// routes.js
const express = require("express");
const WithdrawalRequestController = require("../../controllers/withdrawRequest/withdrawControler");

const router = express.Router();
const withdrawalRequestController = new WithdrawalRequestController();

// Route for creating withdrawal requests
router.post("/withdrawalRequest", async (req, res, next) => {
  withdrawalRequestController.createWithdrawalRequest(req, res, next);
});

// Route for fetching withdrawal requests by status
router.get("/withdrawalRequests/:status", async (req, res, next) => {
  withdrawalRequestController.getWithdrawalRequestsByStatus(req, res, next);
});

// New route for approving withdrawal requests
router.post("/approveWithdrawalRequest", async (req, res, next) => {
  withdrawalRequestController.approveWithdrawalRequest(req, res, next);
});

module.exports = router;
