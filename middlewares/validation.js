import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/error.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array() });
    throw new ValidationError(JSON.stringify(errors.array()));
  }
  next();
};
