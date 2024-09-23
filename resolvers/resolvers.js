import User from '../models/User.js';
import Profile from '../models/Profile.js';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError, ForbiddenError } from 'apollo-server-express';
import axios from 'axios';

const generateToken = (user) => {
  const payload = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
  };
  return jwt.sign({ user: payload }, process.env.JWT_SECRET);
};

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getProfiles: async () => {
      try {
        return await Profile.find().populate('user', ['name', 'avatar']);
      } catch (err) {
        console.error(err);
        throw new Error('Server error');
      }
    },
    getProfileByUserId: async (_, { userId }) => {
      try {
        const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);
        if (!profile) {
          throw new UserInputError('Profile not found');
        }
        return profile;
      } catch (err) {
        console.error(err);
        throw new Error('Server error');
      }
    },
    getCurrentProfile: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        const profile = await Profile.findOne({ user: user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
          throw new UserInputError('Profile not found');
        }
        return profile;
      } catch (err) {
        console.error(err);
        throw new Error('Server error');
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throw new AuthenticationError('Invalid password');
      }

      const token = generateToken(user);

      return {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
        },
      };
    },
    register: async (_, { name, email, password, isAdmin = false }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new UserInputError('User already exists');
      }

      const newUser = await User.create({
        name,
        email,
        password,
        isAdmin,
      });

      const token = generateToken(newUser);

      return {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          isAdmin: newUser.isAdmin,
        },
      };
    },
    createProfile: async (_, { company, location, status, skills, githubUsername }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const profileFields = {
        user: user.id,
        company,
        location,
        status,
        skills,
        githubUsername,
      };

      try {
        let profile = await Profile.findOne({ user: user.id });

        if (profile) {
          profile = await Profile.findOneAndUpdate({ user: user.id }, { $set: profileFields }, { new: true });
          return profile;
        }

        profile = await Profile.create(profileFields);
        return profile;
      } catch (err) {
        console.error(err);
        throw new Error('Server error');
      }
    },
    updateProfile: async (_, { company, location, status, skills, githubUsername }, { user }) => {
      if (!user) {
        throw new AuthenticationError('Not authenticated');
      }

      const profileFields = {
        company,
        location,
        status,
        skills,
        githubUsername,
      };

      try {
        const profile = await Profile.findOneAndUpdate({ user: user.id }, { $set: profileFields }, { new: true });
        if (!profile) {
          throw new UserInputError('Profile not found');
        }
        return profile;
      } catch (err) {
        console.error(err);
        throw new Error('Server error');
      }
    },
  },
};

export default resolvers;
