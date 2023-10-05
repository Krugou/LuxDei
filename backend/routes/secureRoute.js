'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
import User from '../models/User.js';

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
router.put('/users', async (req, res, next) => {
  try {
    if (!req.user) {
      next(httpError('User info not available', 403));
      return;
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
    console.log(req.body, 'body info put user');

    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
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
});

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
