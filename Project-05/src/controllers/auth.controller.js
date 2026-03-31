const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

async function handleUserRegister(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All input fields are required" });
    }

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      return res
        .status(409)
        .json({ message: "username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    return res.status(201).json({
      message: "User has successfully been created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function handleGetUser(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

     const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded.id);

    if(!user){
      return res.status(404).json({message: "User not found"})
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (err) {
    console.log("Cannot fetch user", err);

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleUserRegister,
  handleGetUser,
};
