const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  age: { type: Number, required: true },
  role: { type: String, required: true },
});

//Creating the Model-> It will be saved as a collection in your database
const User = mongoose.model("user", userSchema);

module.exports = User;
