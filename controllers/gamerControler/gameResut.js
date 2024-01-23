// controllers/gamerController/checkWin.js
const mongoose = require("mongoose");
const Gamer = require("../../model/gamer");
const ContractGameTable = require("../../model/GameTable");
const GameCoins = require("../../model/gamePoint");

const checkWin = async (req, res) => {
  try {
    const { _id, OriginalBetWin, result } = req.body;

    // Find the gamer based on _id
    const gamer = await Gamer.findOne({ _id });

    if (!gamer) {
      return res.status(404).json({ error: "Gamer not found" });
    }

    // Find the game coins record for the gamer using gamer _id
    const gameCoins = await GameCoins.findOne({ address: gamer.gamer_Address });

    if (!gameCoins) {
      return res
        .status(404)
        .json({ error: "Game coins not found for the gamer" });
    }

    // Find the game table based on the gamer's table ID
    const gamertableID = gamer.betInformation.table_ID;
    const gameTable = await ContractGameTable.findOne({ _id: gamertableID });

    if (!gameTable) {
      return res.status(404).json({ error: "Game table not found" });
    }

    let winAmount = 0; // Define winAmount in the appropriate scope

    // Update the win_or_lose field and set the end date based on user input
    gamer.betInformation.win_or_lose = result; // 'win', 'lose', or 'tie'
    gamer.betInformation.OriginalBetWin = OriginalBetWin;
    gamer.betInformation.endDate = Date.now();
    await gamer.save();

    // Update game coins based on the result
    if (result === "win") {
      // Multiply game coins by winners reward
      const betAmount = parseInt(gamer.betInformation.betAmount);
      const WinnerReward = gameTable.winners_Rewards;

      if (!isNaN(betAmount) && !isNaN(WinnerReward)) {
        winAmount = betAmount * WinnerReward; // Update winAmount
        gameCoins.gamePoints =
          parseInt(gameCoins.gamePoints) + parseInt(winAmount);
      } else {
        console.error("Invalid bet amount or winners reward");
      }

      // Subtract the win amount from Running_Token
      gameTable.Running_Token -= winAmount;
    } else if (result === "lose") {
      // Deduct game coins
      gameCoins.gamePoints =
        gameCoins.gamePoints - gamer.betInformation.betAmount; // Deduct bet amount for loss

      // Add the loss amount to Running_Token
      gameTable.Running_Token += parseInt(gamer.betInformation.betAmount);
    }

    // Check if Running_Token is equal to or less than Stop_Loss
    if (gameTable.Running_Token <= gameTable.Stop_Loss) {
      gameTable.status = "inactive";
    }

    await gameCoins.save();
    await gameTable.save();

    res
      .status(200)
      .json({ message: `Gamer result updated: ${result}, Game coins updated` });
  } catch (error) {
    console.error("Error checking win:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = checkWin;
