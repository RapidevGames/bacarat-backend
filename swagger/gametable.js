// routes/gameTableRoutes.js
/**
 * @swagger
 * /game-table/create:
 *   post:
 *     summary: Create a new game table
 *     tags:
 *       - GameTable
 *     requestBody:
 *       description: Game table details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameTable'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               message: Table created successfully
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */


/**
 * @swagger
 * /game-table/getDetails/{table_ID}:
 *   get:
 *     summary: Get details of a specific game table
 *     tags:
 *       - GameTable
 *     parameters:
 *       - in: path
 *         name: table_ID
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the game table to get details
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *       404:
 *         description: Game table not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Game table not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */



/**
 * @swagger
 * /game-table/tablesDeatils:
 *   get:
 *     summary: Get details of a specific game table
 *     tags:
 *       - GameTable
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *       404:
 *         description: Game table not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Game table not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
 */