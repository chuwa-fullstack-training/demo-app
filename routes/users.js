/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         avatar:
 *           type: string
 *           description: The avatar of the user
 *         isAdmin:
 *           type: boolean
 *           description: The admin status of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was last updated
 */
import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/users.js';
import { verifyToken, checkAdmin } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /api/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: server error
 */
router.get('/', getAllUsers);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 * /api/users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user with the id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', verifyToken, checkAdmin, deleteUser);

export default router;
