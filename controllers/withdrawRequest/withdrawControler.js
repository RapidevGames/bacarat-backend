// WithdrawalRequestController.js
const WithdrawalRequest = require("../../model/WithdrawalRequest");
const User = require("../../model/gamePoint");

class WithdrawalRequestController {
  async createWithdrawalRequest(req, res, next) {
    try {
      const { address, withdrawGameCoins, status } = req.body;

      // Check if there are any pending withdrawal requests for the user
      const pendingRequests = await WithdrawalRequest.find({
        address,
        status: "pending",
      });

      if (pendingRequests.length > 0) {
        return res.status(400).json({
          success: false,
          message: "There is already a pending withdrawal request.",
        });
      }

      // Check if the user exists and has sufficient game coins
      const user = await User.findOne({ address });
      if (!user || user.gamePoints < withdrawGameCoins) {
        return res.status(400).json({
          success: false,
          message: "Insufficient game coins for withdrawal.",
        });
      }

      // Create a new withdrawal request and transfer game coins
      const withdrawalRequest = new WithdrawalRequest({
        address,
        withdrawGameCoins,
        date: new Date(),
        status,
      });
      await withdrawalRequest.save();

      // Deduct game points from the user only if the status is 'pending'
      if (status === "pending") {
        user.gamePoints -= withdrawGameCoins;
        await user.save();
      }

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Withdrawal request submitted successfully.",
      });
    } catch (error) {
      console.error("Error creating withdrawal request:", error.message);
      // Handle and respond with an error
      res.status(500).json({
        success: false,
        message: "Error creating withdrawal request.",
        error: error.message,
      });
    }
  }

  async getWithdrawalRequestsByStatus(req, res, next) {
    try {
      const { status } = req.params;

      // Check if the provided status is valid
      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status provided. Please provide 'pending', 'approved', or 'rejected'.",
        });
      }

      // Fetch withdrawal requests based on status
      const withdrawalRequests = await WithdrawalRequest.find({ status });

      // Respond with the list of withdrawal requests
      res.status(200).json({
        success: true,
        message: `Withdrawal requests with status '${status}' fetched successfully.`,
        withdrawalRequests,
      });
    } catch (error) {
      console.error("Error fetching withdrawal requests:", error.message);
      // Handle and respond with an error
      res.status(500).json({
        success: false,
        message: "Error fetching withdrawal requests.",
        error: error.message,
      });
    }
  }

  async approveWithdrawalRequest(req, res, next) {
    try {
      const { requestId, adminAddress } = req.body;

      // Find the withdrawal request by ID
      const withdrawalRequest = await WithdrawalRequest.findById(requestId);

      // Check if the withdrawal request exists and is pending
      if (!withdrawalRequest || withdrawalRequest.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: "Invalid or non-pending withdrawal request.",
        });
      }

      // Update the withdrawal request status to 'approved' and set the admin address
      withdrawalRequest.status = "approved";
      withdrawalRequest.adminAddress = adminAddress;
      await withdrawalRequest.save();

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Withdrawal request approved successfully.",
      });
    } catch (error) {
      console.error("Error approving withdrawal request:", error.message);
      // Handle and respond with an error
      res.status(500).json({
        success: false,
        message: "Error approving withdrawal request.",
        error: error.message,
      });
    }
  }
}

module.exports = WithdrawalRequestController;
