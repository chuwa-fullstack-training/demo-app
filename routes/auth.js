import express from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser } from '../controllers/auth.js';
import { validate } from '../middlewares/validation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       200:
 *         description: The user logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The auto-generated id of the user
 *                     name:
 *                       type: string
 *                       description: The name of the user
 *                     email:
 *                       type: string
 *                       description: The email of the user
 *                     avatar:
 *                       type: string
 *                       description: The avatar of the user
 *                     isAdmin:
 *                       type: boolean
 *                       description: The admin status of the user
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time the user was created
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time the user was last updated
 *       400:
 *         description: The email or password is incorrect
 *       500:
 *         description: Server error
 */
router.post(
  '/login',
  [check('email', 'Please provide a valid email').isEmail(), check('password', 'Password is required').exists()],
  validate,
  loginUser,
);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('isAdmin', 'isAdmin must be a boolean').isBoolean(),
  ],
  validate,
  registerUser,
);

export default router;
