import User from "../models/User.js";
import Profile from "../models/Profile.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getUserById = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {
  try {
    // Remove user's profile along with the user
    await Profile.findOneAndDelete({ user: req.params.id });

    // Remove all posts created by the user
    // await Post.deleteMany({ user: req.params.id });

    // Remove the user
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
