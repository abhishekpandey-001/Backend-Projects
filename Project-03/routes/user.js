const express = require("express");
const {
  handleGetAllUsers,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser,
} = require("../controllers/user");

const router = express.Router();

router.get("/", handleGetAllUsers);

router.post("/", handlePostUser);

router.delete("/:id", handleDeleteUserById);

router.patch("/:id", handleUpdateUserById);

module.exports = router;
