// routes/gameTableRoutes.js
const express = require("express");
const router = express.Router();
const gameTableController = require("../../controllers/gameTableController/index");
const GameTableDetails = require("../../controllers/gameTableController/gameTable")

router.post("/create", gameTableController.createGameTable);
router.get('/getDetails/:table_ID', GameTableDetails.getGameTableDetails);
router.get('/tablesDeatils', GameTableDetails.getAllGameTableDetails);


module.exports = router;
