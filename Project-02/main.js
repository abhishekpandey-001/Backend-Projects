const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(express.json());

//Creating Schemas for our CRUD now
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  jobTitle: {
    type: String,
  },

  gender: {
    type: String,
  },
});

//create collection (or creating a model)
const userCollection = mongoose.model("user", userSchema);

//Implementing CRUD logic and creating APIs
//1=> POST users
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "all fields are required..." });
  }
  const result = await userCollection.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success!" });
});

//2=> GET all users

app.get("/api/users", async (req, res) => {
  const allDbUsers = await userCollection.find({});
  const html = `
  <ul>
     ${allDbUsers.map((users) => `<li>${users.firstName} - ${users.email}</li>`).join("")}
  </ul>
  `;
  res.send(html);
});

//3=> PATCH or update a user

app.patch("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ msg: "Invalid id entered" });
  await userCollection.findByIdAndUpdate(id, req.body);
  res.status(200).send({ msg: "Successfully updated the user" });
});

//4=> DELETE the user

app.delete("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ msg: "Invalid id entered" });
  await userCollection.findByIdAndDelete(id);
  return res.status(200).json({ msg: "User deleted successfully" });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("error occured: ", err));
