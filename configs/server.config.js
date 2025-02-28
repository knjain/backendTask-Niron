// Load environment variables from .env file
require("dotenv").config();
const connectToDatabase = require("./database.config");

// ############### Connect Database ###############

connectToDatabase();

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL;

module.exports = {
  PORT,
  BASE_URL,
};
