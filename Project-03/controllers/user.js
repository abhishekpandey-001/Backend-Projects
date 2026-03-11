const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  try {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
  } catch (err) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const handleUpdateUserById = async (req, res) => {
  const id = req.params.id;
  const updatedFields = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedFields);
    if (!updatedUser)
      return res.status(404).json({ message: "User doesn't exist!" });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!", err });
  }
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User doesn't exist!" });
    return res.status(200).json({ message: "Successfully deleted the user!" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error!", err });
  }
};

const handlePostUser = async (req, res) => {
  const userData = req.body;
  if (
    !userData ||
    !userData.first_name ||
    !userData.last_name ||
    !userData.age ||
    !userData.role
  )
    return res.status(400).json({ message: "All fields are required!" });

  try {
    await User.create({
      firstName: userData.first_name,
      lastName: userData.last_name,
      age: userData.age,
      role: userData.role,
    });

    return res
      .status(201)
      .json({ message: "User has been successfully created!" });
  } catch (err) {
    console.log("Couldn't post the user:", err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  handleGetAllUsers,
  handleUpdateUserById,
  handleDeleteUserById,
  handlePostUser,
};
