const mongoose = require("mongoose");
const config = require("./config");

const connectToMongodb = async () => {
  try {
    if (!config.MONGO_URL) {
      console.log("MongoDB URL is not present");
      process.exit(1);
    }
    await mongoose.connect(config.MONGO_URL);
    console.log("Connected to the MongoDB");
  } catch (err) {
    console.log("Error occured while connecting to the MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectToMongodb;
