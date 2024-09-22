import { Router } from 'express';
import {
  getProfiles,
  getProfileByUserId,
  createProfile,
  updateProfile,
  getCurrentProfile,
  getGithubRepos
} from '../controllers/profile.js';
import { verifyToken as auth } from '../middlewares/auth.js';
import { check } from 'express-validator';
import { validate } from '../middlewares/validation.js';

const router = Router();

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get profile by user id
// @access  Public
router.get('/user/:userId', getProfileByUserId);

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, getCurrentProfile);

// @route   PUT api/profile/me
// @desc    Update current user's profile
// @access  Private
router.put('/me', auth, updateProfile);

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  '/',
  auth,
  [
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty()
  ],
  validate,
  createProfile
);

// @route   PUT api/profile
// @desc    Update user's profile
// @access  Private
router.put('/:id', auth, updateProfile);

// @route   DELETE api/profile
// @desc    Delete user's profile
// @access  Private
// router.delete("/", auth, deleteProfile);

// @route   GET api/profile/github/:username
// @desc    Get user's GitHub repositories
// @access  Public
router.get('/github/:username', getGithubRepos);

export default router;
