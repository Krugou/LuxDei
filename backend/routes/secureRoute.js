'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.user, 'USER ASDASD');
  res.json(req.user);
  try {
  } catch (error) {
    next(httpError('User info not available', 403));
    return;
  }
});
router.put(
  '/users',
  [
    // Validate email
    body('email').isEmail().optional({ checkFalsy: true }),

    // Validate password: At least 8 characters with at least one uppercase letter (Unicode)
    body('password')
      .matches(/(?=.*\p{Lu}).{8,}/u)
      .optional({ checkFalsy: true }),

    // Validate username: Minimum length 3, alphanumeric characters only
    body('name')
      .isLength({ min: 3 })
      .matches(/^[a-zA-Z0-9]+$/)
      .optional({ checkFalsy: true }),

    body('countryid').escape().optional({ checkFalsy: true }),
  ],
  async (req, res, next) => {
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('get_UserProfileLimited validation', errors.array());

      res.status(400).json({ error: 'Invalid inputs' });
    }
    try {
      let data = req.body;
      if (!req.user) {
        next(httpError('User info not available', 403));
        return;
      }
      // Check if username is already taken:
      const existingUser = await User.findOne({ name: data.name });
      if (existingUser) {
        return res.status(404).json({ message: 'Username already exists' });
      }

      const userId = req.user._id; // Extract userId from the request user info

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.error('put users validation', errors.array());
        res.json({
          message: 'Invalid inputs',
        });
        next(httpError('Invalid data', 400));
        return;
      }

      if (data.password) {
        const salt = bcrypt.genSaltSync(10);
        const pwd = bcrypt.hashSync(data.password, salt);

        delete data.password;
        data = {
          ...data,
          password: pwd,
        };
      }

      console.log(data, 'DATA');
      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error modifying user', error);
      next(httpError('Internal server error', 500));
      return;
    }
  }
);

router.delete('/users', async (req, res, next) => {
  try {
    // Check if the user is authenticated and exists in the request
    if (!req.user) {
      next(httpError('User info not available', 403));
      return;
    }

    // Get the user's ID from the authenticated user
    const userId = req.user._id;
    console.log(userId, 'USER IDDDD');
    // Use the User model to delete the user from the database
    const result = await User.deleteOne({ _id: userId });
    console.log(result, 'USER DELETE RESULT');
    // Check if the user was successfully deleted
    if (result.deletedCount === 1) {
      res.json({ message: 'User deleted successfully' });
    } else {
      next(httpError('User not found', 404));
      return;
    }
  } catch (error) {
    console.error('Error deleting user', error);
    next(httpError('Internal server error', 500));
    return;
  }
});
export default router;
