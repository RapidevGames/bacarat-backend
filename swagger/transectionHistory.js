/**
 * @swagger
 * tags:
 *   name: TransactionsHistory
 *   description: API for handling token transactionsHistory
 */

/**
 * @swagger
 * /transactionsHistory/{walletAddress}:
 *   get:
 *     summary: Get list of transactionsHistory on the Polygon (Matic) chain for a wallet
 *     tags: [TransactionsHistory]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: The wallet address to fetch transactionsHistory for
 *     responses:
 *       200:
 *         description: List of transactionsHistory fetched successfully
 *       400:
 *         description: Bad request. Check the request parameters.
 *       500:
 *         description: Internal server error.
 */
