const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const dns = require('dns')
dns.setServers(["1.1.1.1", "8.8.8.8"])

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("error occured: ", err));
