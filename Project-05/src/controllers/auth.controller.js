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

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      config.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });

    return res.status(201).json({
      message: "User has successfully been created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

async function handleRefreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET_KEY);

    const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      config.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    return res
      .status(200)
      .json({ message: "Access token refreshed successfully", accessToken });
  } catch (err) {
    console.log("Cannot refresh the access token", err);
    return res
      .status(401)
      .json({ message: "Cannot refresh the access token " });
  }
}

module.exports = {
  handleUserRegister,
  handleGetUser,
  handleRefreshToken,
};
