const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

//Creating Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  age: { type: Number, required: true },
  role: { type: String, required: true },
});

//Creating the Model-> It will be saved as a collection in your database
const Users = mongoose.model("user", userSchema);

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
