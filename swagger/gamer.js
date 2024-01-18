/**
 * @swagger
 * tags:
 *   name: Gamer
 *   description: API for Baccart game operations
 */

/**
 * @swagger
 * /gamer/join:
 *   post:
 *     summary: Join the game
 *     tags: [Gamer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gamer_Address:
 *                 type: string
 *               betAmount:
 *                 type: string
 *               betOn:
 *                 type: string
 *               table_ID:
 *                 type: string
 *             required:
 *               - gamer_Address
 *               - betAmount
 *               - betOn
 *               - table_ID
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: Gamer joined the game successfully!
 *               gamer:
 *                 _id: "123"
 *                 gamer_Address: "sample_address"
 *                 betInformation:
 *                   betSize: "sample_size"
 *                   betOn: "sample_betOn"
 *                   table_ID: "sample_table_ID"
 *                   startDate: "2023-01-01T00:00:00.000Z"
 *               gameTable:
 *                 _id: "456"
 *                 # Add other relevant game table details here
 *               gameCoins:
 *                 # Add relevant game coins details here
 *       '400':
 *         description: Bad request. Check the request parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid betOn value"
 *       '404':
 *         description: Game table not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Game table not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /gamer/checkWin:
 *   post:
 *     summary: Check the win result
 *     tags: [Gamer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               OriginalBetWin:
 *                 type: string
 *               result:
 *                 type: string
 *             required:
 *               - _id
 *               - OriginalBetWin
 *               - result
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: "Gamer result updated: win"
 *       '404':
 *         description: Gamer not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Gamer not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /gamer/getGamerDetails:
 *   post:
 *     summary: Get gamer details
 *     tags: [Gamer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gamer_Address:
 *                 type: string
 *             required:
 *               - gamer_Address
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               gamer:
 *                 _id: "123"
 *                 gamer_Address: "sample_address"
 *                 # Add other relevant gamer details here
 *       '404':
 *         description: Gamer not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Gamer not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
