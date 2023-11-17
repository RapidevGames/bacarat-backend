const { ethers } = require('ethers');
require('dotenv').config();
const infuraController = require('./infuraController');
const CCCtokenAbi = require('../contractAbi/CCC.json');
const CCCAddress = process.env.CCC_CONTRACT_ADDRESS;
const USDTtokenAbi = require('../contractAbi/USDT.json');
const USDTAddress = process.env.USDT_CONTRACT_ADDRESS;

const getWalletBalance = async (address) => {
    const provider = infuraController.getInfuraProvider();
    const CCCTokenContract = new ethers.Contract(CCCAddress, CCCtokenAbi, provider);
    const usdtContract = new ethers.Contract(USDTAddress, USDTtokenAbi, provider);

    try {
        // Fetch ETH balance
        const maticBalance = await provider.getBalance(address);
        // Fetch CCC token balance
        const cccbalance = await CCCTokenContract.balanceOf(address);
        const usdtbalance = await usdtContract.balanceOf(address);

        return {
            MaticBalance: ethers.utils.formatEther(maticBalance),
            CCC_Token: cccbalance.toString() / 100000000,
            USDT: usdtbalance.toString(),
        };
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
};

module.exports = {
    getWalletBalance,
};