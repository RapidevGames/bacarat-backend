/**
 * @swagger
 * /wallet/create:
 *   get:
 *     summary: Create a new Crypto wallet
 *     tags:
 *       - Wallet
 *     responses:
 *       200:
 *         description: New Crypto wallet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 privateKey:
 *                   type: string
 *                   description: Private key of the wallet
 *                 mnemonic:
 *                   type: string
 *                   description: Mnemonic phrase of the wallet
 *                 address:
 *                   type: string
 *                   description: Address of the wallet
 */

/**
 * @swagger
 * /wallet/retrieve:
 *   post:
 *     summary: Retrieve a Crypto wallet from mnemonic
 *     tags:
 *       - Wallet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mnemonic:
 *                 type: string
 *                 description: Mnemonic phrase to retrieve the wallet
 *     responses:
 *       200:
 *         description: Wallet retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                   description: Address of the retrieved wallet
 *       500:
 *         description: Internal Server Error
 */
