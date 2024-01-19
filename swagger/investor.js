// /**
//  * @swagger
//  * tags:
//  *   name: Investor
//  *   description: API for investor operations
//  */

// /**
//  * @swagger
//  * /investor/buy-table-shares:
//  *   post:
//  *     summary: Buy table shares
//  *     description: Allows an investor to buy shares of a game table.
//  *     tags: [Investor]
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               table_ID:
//  *                 type: string
//  *                 description: ID of the game table.
//  *               sharesToBuy:
//  *                 type: integer
//  *                 description: Number of shares the investor wants to buy.
//  *               investor_Address:
//  *                 type: string
//  *                 description: Ethereum address of the investor.
//  *             required:
//  *               - investor_ID
//  *               - table_ID
//  *               - sharesToBuy
//  *               - investor_Address
//  *     responses:
//  *       '201':
//  *         description: Shares bought successfully.
//  *       '400':
//  *         description: Invalid input data.
//  *       '404':
//  *         description: Game table not found.
//  *       '500':
//  *         description: Internal Server Error.
//  */

/**
 * @swagger
 * tags:
 *   name: Investor
 *   description: API for investor operations
 */

/**
 * @swagger
 * /investor/buyShares:
 *   post:
 *     summary: Buy table shares
 *     description: Allows an investor to buy shares of a game table.
 *     tags: [Investor]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_ID:
 *                 type: string
 *                 description: ID of the game table.
 *               sharesToBuy:
 *                 type: integer
 *                 description: Number of shares the investor wants to buy.
 *               investor_Address:
 *                 type: string
 *                 description: Ethereum address of the investor.
 *               private_Key:
 *                 type: string
 *                 description: Private key of the investor.
 *             required:
 *               - table_ID
 *               - sharesToBuy
 *               - investor_Address
 *               - private_Key
 *     responses:
 *       '201':
 *         description: Shares bought successfully.
 *       '400':
 *         description: Invalid input data.
 *       '404':
 *         description: Game table not found.
 *       '500':
 *         description: Internal Server Error.
 */
