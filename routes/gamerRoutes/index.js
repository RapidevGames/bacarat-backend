// Add this to your existing routes file (e.g., gamerRoutes.js)
const express = require("express");
const router = express.Router();
const joinGame = require("../../controllers/gamerControler/joinGame");
const checkWin = require("../../controllers/gamerControler/gameResut");

// @ts-ignore
const getGamerDetails = require("../../controllers/gamerControler/gamerDetails");

// Route for joining the game
router.post("/join", (req, res) => {
  try {
    // Extract necessary data from the request
    const { gamer_Address, betAmount, betOn, table_ID } = req.body;

    // Call the controller function
    joinGame(req, res, {
      gamer_Address,
      betAmount,
      betOn,
      table_ID,
    });
  } catch (error) {
    console.error("Error handling join game request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for checking the win result
router.post("/checkWin", (req, res) => {
  try {
    // Extract necessary data from the request
    const { _id, OriginalBetWin, result } = req.body;

    // Call the controller function
    checkWin(req, res, {
      
      _id,
      OriginalBetWin,
      result,
    });
  } catch (error) {
    console.error("Error handling check win request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for getting gamer details
router.post("/getGamerDetails", (req, res) => {
  try {
    // Extract necessary data from the request
    const { gamer_Address } = req.body;

    // Call the controller function
    getGamerDetails(req, res, {
      gamer_Address
    });
  } catch (error) {
    console.error("Error getting gamer details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
