import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user._id,
      avatar: user.avatar,
      isAdmin: user.isAdmin
    };

    const token = jwt.sign({ user: payload }, process.env.JWT_SECRET);

    res
      .status(200)
      .json({ message: 'User logged in successfully', token, id: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password, avatar, isAdmin } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      avatar,
      isAdmin
    });
    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
