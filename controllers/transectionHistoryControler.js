const axios = require('axios');
const ethers = require('ethers');
require('dotenv').config();

const getTransactionsList = async (walletAddress, res) => {
  try {
    const apiKey = process.env.POLYGONSCAN_API_KEY; // You need to set up an account on Polygon Scan and get your API key
    const apiUrl = `https://api.polygonscan.com/api`;
    const module = 'account';
    const action = 'txlist';
    const sort = 'desc';

    const response = await axios.get(apiUrl, {
      params: {
        module,
        action,
        address: walletAddress,
        sort,
        apikey: apiKey,
      },
    });

    if (response.data.status !== '1') {
      return res.status(500).json({
        success: false,
        message: 'Error fetching transactionsHistory.',
        error: response.data.message,
      });
    }

    const transactions = response.data.result.slice(0, 10); // Only take the first 10 transactions

    // Format the transaction data as needed
    const formattedTransactions = transactions.map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: ethers.utils.formatUnits(tx.value, 'wei'), // Adjust unit as needed
      timestamp: new Date(tx.timeStamp * 1000), // Convert timestamp to Date object
    }));

    res.json({ success: true, transactionsHistory: formattedTransactions });
  } catch (error) {
    console.error("Error fetching transactionsHistory:", error.message);
    res.status(500).json({ success: false, message: 'Error fetching transactionsHistory.', error: error.message });
  }
};

module.exports = {
  getTransactionsList,
};
