const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());
const userRouter = require("./routes/user");
const logReqRes = require("./middlewares");

//Middleware - Plugin
app.use(logReqRes("log.txt"));

//Routes
app.use("/user", userRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT, () =>
      console.log(`Server started at Port ${process.env.PORT}`),
    );
  })
  .catch((err) => {
    console.log(`Error occured:`, err);
  });
