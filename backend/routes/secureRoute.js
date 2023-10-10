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
import ChatMessage from '../models/ChatMessage.js';
const router = express.Router();

// GET route to retrieve user information
router.get('/', (req, res, next) => {
  // console.log("🚀 ~ file: secureRoute.js:17 ~ router.get ~ req.user:", req.user)
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
      // console.log("🚀 ~ file: secureRoute.js:82 ~ data:", data)

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
    // console.log("🚀 ~ file: secureRoute.js:116 ~ router.delete ~ userId:", userId)
    // Use the User model to delete the user from the database
    const result = await User.deleteOne({ _id: userId });
    // console.log("🚀 ~ file: secureRoute.js:119 ~ router.delete ~ result:", result)
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
    // console.log("🚀 ~ file: secureRoute.js:148 ~ req.body:", req.body)
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
    body('message')
      .notEmpty()
      .trim()
      .isLength({ max: 500 }) // Add this validation to limit the message to 500 characters
      .withMessage('Message must not exceed 500 characters'), // Custom error message
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
        usernamewhensent: req.user.name,
        useridofsender: req.user._id,
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

    // Iterate through the contacts and get the current username of every contact
    const contactsWithUsernames = await Promise.all(
      contacts.map(async (contact) => {
        // Find the corresponding user by user ID
        const user = await User.findOne({ _id: contact.useridofsender });
        // Extract the username from the user document
        const username = user ? user.name : 'Unknown User';

        // Create a new object with the contact and the extracted username
        return {
          ...contact.toObject(),
          username,
        };
      })
    );

    // Return the list of contacts with usernames
    res.status(200).json(contactsWithUsernames);
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

// Add the getDatabaseInfo route
router.get('/dbinfo', async (req, res, next) => {
  try {
    if (req.user.userrole !== 0) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Fetch the counts of users, comments, and contacts
    const userCount = await User.countDocuments();
    const chatMessageCount = await ChatMessage.countDocuments(); // Assuming you have a Comment model
    const contactCount = await Contact.countDocuments();
    // Find the latest message using the timestamp field
    const latestMessage = await ChatMessage.findOne(
      {},
      {},
      { sort: { timestamp: -1 } }
    );

    // Create an object to hold the counts
    const databaseInfo = {
      users: userCount,
      chatmessages: chatMessageCount,
      contacts: contactCount,
      latestMessageTimestamp: latestMessage ? latestMessage.timestamp : null,
    };

    res.status(200).json(databaseInfo);
  } catch (error) {
    console.error('Error fetching database info', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
