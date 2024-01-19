/**
 * @swagger
 * tags:
 *   name: Game Coin
 *   description: API for handling game coin transactions
 */

/**
 * @swagger
 * /GameCoin/Convert-CCC-to-GameCoin:
 *   post:
 *     summary: Transfer game points (CC tokens) to another wallet
 *     tags: [Game Coin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               privateKey:
 *                 type: string
 *                 description: The private key of the sender's wallet
 *                 example: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef"
 *               amountToSend:
 *                 type: number
 *                 description: The amount of game points to transfer (in CC tokens)
 *                 example: 100
 *     responses:
 *       200:
 *         description: Game points transferred successfully
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
 *                   example: "CC tokens transferred and game points updated successfully."
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
 *                   example: "Bad request. Check the request parameters."
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
 *                   example: "Error transferring CCC tokens and updating game points."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 */

/**
 * @swagger
 * /GameCoin/GameCoinBalance/{walletAddress}:
 *   get:
 *     summary: Get game coin balance for a specific wallet
 *     tags: [Game Coin]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: The wallet address to fetch game coin balance for
 *     responses:
 *       200:
 *         description: Game coin balance fetched successfully
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
 *                   example: "Game coin balance fetched successfully."
 *                 gamePoints:
 *                   type: number
 *                   example: 100
 *       404:
 *         description: User not found.
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
 *                   example: "User not found."
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
 *                   example: "Error fetching game coin balance."
 *                 error:
 *                   type: string
 *                   example: "Internal server error message."
 */
