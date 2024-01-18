// controllers/gamerController/joinGame.js
const mongoose = require('mongoose');
const Gamer = require("../../model/gamer");
const GameCoins = require("../../model/gamePoint");
const ContractGameTable = require("../../model/GameTable");

const joinGame = async (req, res) => {
    try {
        const { gamer_Address, betAmount, betOn, table_ID } = req.body;
    
        // Validate the betOn value (assuming it can be "player", "banker", or "tie")
        if (!["player", "banker", "tie"].includes(betOn)) {
          return res.status(400).json({ error: "Invalid betOn value" });
        }
    
        // Check if the gamer with the given address already exists
        let gamer = await Gamer.findOne({ gamer_Address, table_ID });
    
        if (!gamer) {
          // Create a new gamer if not exists
          gamer = new Gamer({
            gamer_Address,
            betInformation: {
              betAmount,
              betOn,
              table_ID,
              startDate: Date.now(), // Add start date to betInformation
            },
          });
        } else {
          // Update existing gamer's bet information
          const availableGameCoins = await GameCoins.findOne({ address: gamer_Address });
    
          if (!availableGameCoins) {
            return res.status(400).json({ error: "No game coins available for the gamer" });
          }
    
          if (parseInt(betSize) > availableGameCoins.gamePoints) {
            return res.status(400).json({ error: "Not enough game coins for the bet" });
          }
    
          gamer.betInformation = {
            betSize,
            betOn,
            table_ID,
            startDate: Date.now(), // Update start date in betInformation
          };
    
          // Deduct the betSize from the available game coins
          availableGameCoins.gamePoints -= parseInt(betSize);
          await availableGameCoins.save();
        }
    
        await gamer.save(); // Save the gamer

        // Create a new game point entry if not exists
        let gameCoins = await GameCoins.findOne({ address: gamer_Address });

        if (!gameCoins) {
          gameCoins = new GameCoins({
            address: gamer_Address,
          });
          await gameCoins.save();
        }

        if (!mongoose.Types.ObjectId.isValid(table_ID)) {
          return res.status(400).json({ error: "Invalid table_ID" });
        }

        // Add the gamer to the specified game table
        const gameTable = await ContractGameTable.findById(table_ID);

        if (!gameTable) {
          return res.status(404).json({ error: "Game table not found" });
        }

        // Update the gamer reference in the game point entry
        gameCoins.gamer = gamer;
        await gameCoins.save();

        // Update the gamer reference, add the bet information, and set the table ID
        gamer.table_ID = gameTable._id;
        await gamer.save();

        gameTable.gamers.push(gamer);
        await gameTable.save();

        // Include detailed information in the response
        const response = {
          message: "Gamer joined the game successfully!",
          gamer: {
            _id: gamer._id,
            gamer_Address: gamer.gamer_Address,
            betInformation: gamer.betInformation,
          },
          gameTable: {
            _id: gameTable._id,
            // Add other relevant game table details here
          },
          gameCoins: {
            // Add relevant game coins details here
          },
        };

        res.status(201).json(response);
    } catch (error) {
        console.error("Error joining the game:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = joinGame;
