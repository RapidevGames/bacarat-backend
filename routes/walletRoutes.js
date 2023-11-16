// routes/walletRoutes.js
const express = require('express');
const router = express.Router(); // Add this line to create the router
const walletController = require('../controllers/walletController');

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
router.get('/create', walletController.createCryptoWallet);

module.exports = router; 
