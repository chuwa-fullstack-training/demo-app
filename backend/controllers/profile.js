import Profile from '../models/Profile.js';
import axios from 'axios';

export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ message: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const createProfile = async (req, res) => {
  const { company, location, status, skills, githubUsername } = req.body;

  const profileFields = {
    user: req.user.id,
    company,
    location,
    status,
    skills: skills.split(',').map(skill => skill.trim()),
    githubUsername
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = await Profile.create(profileFields);
    res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateCurrentProfile = async (req, res) => {
  const { company, location, status, skills, githubUsername } = req.body;

  const profileFields = {
    company,
    location,
    status,
    skills: skills.split(',').map(skill => skill.trim()),
    githubUsername
  };

  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateProfile = async (req, res) => {};

export const getGithubRepos = async (req, res) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos`
    );
    res.json(repos.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
