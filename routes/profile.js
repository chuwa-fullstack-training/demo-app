import { Router } from 'express';
import {
  getProfiles,
  getProfileByUserId,
  createProfile,
  updateCurrentProfile,
  getCurrentProfile,
  updateProfile,
  getGithubRepos,
} from '../controllers/profile.js';
import { verifyToken as auth } from '../middlewares/auth.js';
import { check } from 'express-validator';
import { validate } from '../middlewares/validation.js';

const router = Router();

router.get('/', getProfiles);

router.get('/user/:userId', getProfileByUserId);

router.get('/me', auth, getCurrentProfile);

router.put('/me', auth, updateCurrentProfile);

router.post(
  '/',
  auth,
  [check('status', 'Status is required').notEmpty(), check('skills', 'Skills is required').notEmpty()],
  validate,
  createProfile,
);

router.put('/:id', auth, updateProfile);

// router.delete("/", auth, deleteProfile);

router.get('/github/:username', getGithubRepos);

export default router;
