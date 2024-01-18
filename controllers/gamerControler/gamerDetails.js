const mongoose = require('mongoose');
const Gamer = require('../../model/gamer');
const ContractGameTable = require('../../model/GameTable');

const getGamerDetails = async (req, res) => {
  try {
    const { gamer_Address } = req.body; // Change to use URL parameter

    // Find all gamers based on the gamer address
    const gamers = await Gamer.find({ gamer_Address })
      .populate('betInformation.table_ID');

    if (!gamers || gamers.length === 0) {
      return res.status(404).json({ error: 'Gamers not found for the specified address' });
    }

    // Adjust the response structure as needed
    const response = {
      gamers: gamers.map((gamer) => ({
        _id: gamer._id,
        gamer_Address: gamer.gamer_Address,
        // Include other relevant gamer details here
        table_ID: gamer.betInformation.table_ID._id,
        betInformation: {
          betOn: gamer.betInformation.betOn,
          betOnbetAmount: gamer.betInformation.betAmount,
          win_or_lose: gamer.betInformation.win_or_lose,
          startDate: gamer.betInformation.startDate,
          EndTime:gamer.betInformation.endDate,
          OriginalBetWin:gamer.betInformation.OriginalBetWin
        },
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting gamer details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getGamerDetails;
