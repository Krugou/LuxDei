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
router.put('/users', (req, res, next) => {
  try {
    if (!req.user) {
      next(httpError('User info not available', 403));
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('put users validation', errors.array());
      res.json({
        message: 'Invalid inputs',
      });
      next(httpError('Invalid data', 400));
      return;
    }
  } catch (error) {
    console.error('Error modifying user', error);
    next(httpError('Internal server error', 500));
    return;
  }
});

router.delete('/',  (req, res, next) => {
  res.send('asdasd');
  try {
    // Check if the user is authenticated and exists in the request
    if (!req.user) {
      next(httpError('User info not available', 403));
      return;
    }

    // Get the user's ID from the authenticated user
    const userId = req.user._id;

    // Use the User model to delete the user from the database
    const result = await User.deleteOne({ _id: userId });

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
