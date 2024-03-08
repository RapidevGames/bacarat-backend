/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API for handling token transactions
 */

/**
 * @swagger
 * /transactions/transferTokensCCC:
 *   post:
 *     summary: Transfer CCC tokens
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: privateKey phrase of the wallet
 *               recipientAddress:
 *                 type: string
 *                 description: Address to receive CCC tokens
 *               amountToSend:
 *                 type: string
 *                 description: Amount of CCC tokens to send (in smallest unit)
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /transactions/transferTokensUSDT:
 *   post:
 *     summary: Transfer USDT tokens
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: privateKey phrase of the wallet
 *               recipientAddress:
 *                 type: string
 *                 description: Address to receive USDT tokens
 *               amountToSend:
 *                 type: string
 *                 description: Amount of USDT tokens to send
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /transactions/transferMATIC:
 *   post:
 *     summary: Transfer MATIC tokens
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: privateKey phrase of the wallet
 *               recipientAddress:
 *                 type: string
 *                 description: Address to receive MATIC tokens
 *               amountToSend:
 *                 type: string
 *                 description: Amount of MATIC to send
 *     responses:
 *       200:
 *         description: Token transfer successful
 *       400:
 *         description: Bad request. Check the request payload.
 *       500:
 *         description: Internal server error.
 */
