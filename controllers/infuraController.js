const { ethers } = require('ethers');
require('dotenv').config();


const getInfuraProvider = () => {
    const infuraRpcUrl = process.env.Infura_URL_Polygone;
    return new ethers.providers.JsonRpcProvider(infuraRpcUrl);
};

const getInfuraPrivateKey = () => {
    return process.env.Infura_Private_Key;
};

module.exports = {
    getInfuraProvider,
    getInfuraPrivateKey,
};