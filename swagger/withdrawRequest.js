/**
 * @swagger
 * tags:
 *   name: Withdrawal Request
 *   description: API for handling withdrawal requests
 */

/**
 * @swagger
 * /withdraw/withdrawalRequest:
 *   post:
 *     summary: Create a withdrawal request
 *     tags: [Withdrawal Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 description: The user's wallet address
 *               withdrawGameCoins:
 *                 type: number
 *                 description: The amount of game coins to withdraw
 *               status:
 *                 type: string
 *                 description: The status of the withdrawal request (pending, approved, rejected)
 *             example:
 *               address: "0x123456789abcdef123456789abcdef123456789a"
 *               withdrawGameCoins: 100
 *
 *     responses:
 *       200:
 *         description: Withdrawal request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Withdrawal request submitted successfully."
 *       400:
 *         description: Bad request. Check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid or non-pending withdrawal request."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error creating withdrawal request."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 *
 * /withdraw/approveWithdrawalRequest:
 *   post:
 *     summary: Approve a withdrawal request
 *     tags: [Withdrawal Request]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestId:
 *                 type: string
 *                 description: The ID of the withdrawal request to approve
 *               adminAddress:
 *                 type: string
 *                 description: The wallet address of the admin approving the request
 *             example:
 *               requestId: "605a1f5e08a0a4f55c360b17"
 *               adminAddress: "0xAdminAddress123456789abcdef"
 *     responses:
 *       200:
 *         description: Withdrawal request approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Withdrawal request approved successfully."
 *       400:
 *         description: Bad request. Check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid or non-pending withdrawal request."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error approving withdrawal request."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 *
 * /withdraw/withdrawalRequests/{status}:
 *   get:
 *     summary: Get withdrawal requests by status
 *     tags: [Withdrawal Request]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: The status of withdrawal requests to fetch (pending, approved, rejected)
 *     responses:
 *       200:
 *         description: Withdrawal requests fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Withdrawal requests with status 'pending' fetched successfully."
 *                 withdrawalRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "605a1f5e08a0a4f55c360b17"
 *                       address:
 *                         type: string
 *                         example: "0x123456789abcdef123456789abcdef123456789a"
 *                       withdrawGameCoins:
 *                         type: number
 *                         example: 100
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2022-12-21T12:34:56.789Z"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       adminAddress:
 *                         type: string
 *                         example: "0xAdminAddress123456789abcdef"
 *       400:
 *         description: Bad request. Check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid status provided. Please provide 'pending', 'approved', or 'rejected'."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error fetching withdrawal requests."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 */
