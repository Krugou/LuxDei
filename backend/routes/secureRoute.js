'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
import User from '../models/User.js';
import Schedule from '../models/Schedule.js';
import bcrypt from 'bcryptjs';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET route to retrieve user information
router.get('/', (req, res, next) => {
  console.log(req.user, 'USER ASDASD');
  res.json(req.user);
});

// PUT route to update user information
router.put(
  '/users',
  [
    // Validate email, optional
    body('email').isEmail().optional({ checkFalsy: true }),

    // Validate password: At least 8 characters with at least one uppercase letter (Unicode) optional
    body('password')
      .matches(/(?=.*\p{Lu}).{8,}/u)
      .optional({ checkFalsy: true }),

    // Validate username: Minimum length 3, alphanumeric characters only optional
    body('name')
      .isLength({ min: 3, max: 15 })
      .matches(/^[a-zA-Z0-9]+$/)
      .optional({ checkFalsy: true }),

    body('countryid').escape().optional({ checkFalsy: true }), // optional input
  ],
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('get_UserProfileLimited validation', errors.array());

      return res.status(400).json({ error: 'Invalid inputs' });
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
      if (data.userrole) delete data.userrole; // makes it so that users can't make themselves admin
      if (data.name) data.name = data.name.toLowerCase();
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

// DELETE route to delete user account
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

// POST route to create a new schedule item
router.post(
  '/schedule',
  [
    // Validate schedule data
    body('day').notEmpty().trim(),
    body('schedule.*.time').notEmpty().trim(),
    body('schedule.*.title').notEmpty().trim(),
  ],
  async (req, res, next) => {
    if (req.user.userrole !== 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    console.log(req.body, 'post schedule body');
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('Create Schedule validation', errors.array());

      return res.status(400).json({ error: 'Invalid inputs' });
    }

    try {
      const scheduleData = req.body;

      // Create a new schedule item
      const newScheduleItem = new Schedule(scheduleData);

      // Save the new schedule item to the database
      await newScheduleItem.save();

      res.status(201).json({ message: 'Schedule item created successfully' });
    } catch (error) {
      console.error('Error creating schedule item', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.post(
  '/contact',
  [
    // Validate contact data
    body('name').notEmpty().trim(),
    body('email').isEmail().notEmpty().trim(),
    body('message').notEmpty().trim(),
  ],
  async (req, res, next) => {
    // Check if the user is authenticated and exists in the request
    if (!req.user) {
      next(httpError('User info not available', 403));
      return;
    }

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('Create Contact validation', errors.array());

      return res.status(400).json({ error: 'Invalid inputs' });
    }

    try {
      let contactData = req.body;
      contactData = {
        ...contactData,
        usernameofsender: req.user.name,
      };
      // Create a new contact
      const newContact = new Contact(contactData);

      // Save the new contact to the database
      await newContact.save();

      res.status(201).json({ message: 'Contact created successfully' });
    } catch (error) {
      console.error('Error creating contact', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.get('/contact', async (req, res, next) => {
  // Check if the user is authenticated and exists in the request
  if (!req.user) {
    next(httpError('User info not available', 403));
    return;
  }

  if (req.user.userrole !== 0) {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    // Fetch all contacts from the database
    const contacts = await Contact.find();

    // Return the list of contacts
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/contact/:contactID', async (req, res, next) => {
  // Check if the user is authenticated and exists in the request
  if (!req.user) {
    next(httpError('User info not available', 403));
    return;
  }

  try {
    if (req.user.userrole !== 0) {
      return res.status(403).json({ error: 'Access denied' });
    }
    const contactID = req.params.contactID;

    // Check if the contact with the specified ID exists
    const contact = await Contact.findById(contactID);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Check if the user has permission to delete the contact (e.g., only admins can delete)

    // Delete the contact from the database
    await Contact.findByIdAndRemove(contactID);

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact', error);
    next(httpError('Internal server error', 500));
  }
});
export default router;
