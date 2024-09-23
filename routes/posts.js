import { Router } from 'express';
import { check } from 'express-validator';
import { createPost, getCurrentUserPosts, getPosts, getPostById, deletePost, likePost, updatePost } from '../controllers/posts.js';
import { verifyToken as auth, checkAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validation.js';

const router = Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', auth, [check('text', 'Text is required').notEmpty()], validate, createPost);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, getPosts);

// @route   GET api/posts/me
// @desc    Get current user's posts
// @access  Private
router.get('/me', auth, getCurrentUserPosts);

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, getPostById);

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', auth, updatePost);

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, deletePost);

// @route   PUT api/posts/:id/like
// @desc    Like / Dislike a post
// @access  Private
router.put('/:id/like', auth, likePost);

export default router;
