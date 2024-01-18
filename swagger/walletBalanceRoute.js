/**
 * @swagger
 * /balance/{address}:
 *   get:
 *     summary: Get balances for a wallet address
 *     tags:
 *       - Wallet
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         description: The wallet address to get balances for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Balances fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ethBalance:
 *                   type: string
 *                   description: ETH balance of the wallet
 *                 maticBalance:
 *                   type: string
 *                   description: Matic balance of the wallet
 *                 cccTokenBalance:
 *                   type: string
 *                   description: CCC token balance of the wallet
 *       500:
 *         description: Error fetching balances
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Details of the error
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Error message
 *                     name:
 *                       type: string
 *                       description: Error name
 *                     stack:
 *                       type: string
 *                       description: Error stack trace
 *                     config:
 *                       type: object
 *                       description: Axios request configuration
 *                     code:
 *                       type: string
 *                       description: Error code
 *                     status:
 *                       type: integer
 *                       description: HTTP status code
 */
