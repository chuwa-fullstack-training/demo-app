import express from "express";
import { check } from "express-validator";
import { loginUser, registerUser } from "../controllers/auth.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  validate,
  loginUser
);

/**
 * @route POST /api/auth/register
 * @desc Register user
 * @access Public
 */
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("isAdmin", "isAdmin must be a boolean").isBoolean(),
  ],
  validate,
  registerUser
);

export default router;
