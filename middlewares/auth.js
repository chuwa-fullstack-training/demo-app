import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization'); // || req.header("x-auth-token");
  if (!token) {
    throw new AuthError('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new AuthError('Invalid token');
  }
};

export const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    throw new AuthError('Not authorized as an admin');
  }
};
