import { Router } from 'express';
import { check } from 'express-validator';
import {
  createPost,
  getCurrentUserPosts,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  updatePost,
} from '../controllers/posts.js';
import { verifyToken as auth, checkAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';

const router = Router();

router.post('/', auth, [check('text', 'Text is required').notEmpty()], validate, createPost);

router.get('/', auth, getPosts);

router.get('/me', auth, getCurrentUserPosts);

router.get('/:id', auth, getPostById);

router.put('/:id', auth, updatePost);

router.delete('/:id', auth, deletePost);

router.put('/:id/like', auth, likePost);

export default router;
