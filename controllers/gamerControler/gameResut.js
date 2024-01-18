// controllers/gamerController/checkWin.js
const mongoose = require('mongoose');
const Gamer = require('../../model/gamer');
const ContractGameTable = require('../../model/GameTable');
const GameCoins = require('../../model/gamePoint');



const checkWin = async (req, res) => {
  try {
    const { _id,OriginalBetWin, result } = req.body;

    // Find the gamer based on _id
    const gamer = await Gamer.findOne({ _id }); // Pass an object as a parameter

    if (!gamer) {
      return res.status(404).json({ error: 'Gamer not found' });
    }
    // Find the game coins record for the gamer using gamer _id
    const gameCoins = await GameCoins.findOne({ address: gamer.gamer_Address });


    if (!gameCoins) {
      return res.status(404).json({ error: 'Game coins not found for the gamer' });
    }

    // Update the win_or_lose field and set the end date based on user input
    gamer.betInformation.win_or_lose = result; // 'win', 'lose', or 'tie'
    gamer.betInformation.OriginalBetWin = OriginalBetWin; 
    gamer.betInformation.endDate = Date.now();
    await gamer.save();

    
    // Update game coins based on the result
    if (result === 'win') {
      
      
      // Multiply game coins by winners reward
      const betAmount = parseInt(gamer.betInformation.betAmount);
      const gamertableID = gamer.betInformation.table_ID;
      const gamewinamount = await ContractGameTable.findOne({ _id: gamertableID });
      const WinnerReward = gamewinamount.winners_Rewards
 
  if (!isNaN(betAmount) && !isNaN(WinnerReward)) {
    const winAmount = betAmount * WinnerReward;
    gameCoins.gamePoints = parseInt(gameCoins.gamePoints) + parseInt(winAmount);
   } else {
    console.error('Invalid bet amount or winners reward');

  }

    } else if (result === 'lose') {
      // Deduct game coins
      // You may adjust this logic based on your specific requirements
      gameCoins.gamePoints = gameCoins.gamePoints - gamer.betInformation.betAmount; // Deduct bet amount for loss
    }

    await gameCoins.save();

    res.status(200).json({ message: `Gamer result updated: ${result}, Game coins updated` });
  } catch (error) {
    console.error('Error checking win:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = checkWin;
