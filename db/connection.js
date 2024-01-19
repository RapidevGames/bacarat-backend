// db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from a .env file if present

// Retrieve MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Bind connection to open event (to get notification of successful connection)
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
