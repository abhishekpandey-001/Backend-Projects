const dotenv = require("dotenv");
dotenv.config();

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT Secret key is not available");
}

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = config;
