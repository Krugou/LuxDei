// routes/userRoutes.js

import express from 'express';
import User from '../models/User.js';
import httpError from '../utils/errors.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
const router = express.Router();

router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error('Error getting users from the database', err);
      res.status(500).json({ error: 'Error getting users from the database' });
    });
});

router.get('/clear', async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.send(`Deleted ${result.deletedCount} users`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting users');
  }
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => {
      console.error('Error getting user from the database', err);
      res.status(500).json({ error: 'Error getting user from the database' });
    });
});

router.post(
  '/',
  [
    // Validate email
    body('email').isEmail(),

    // Validate password: At least 8 characters with at least one uppercase letter (Unicode)
    body('password').matches(/(?=.*\p{Lu}).{8,}/u),

    // Validate username: Minimum length 3, alphanumeric characters only
    body('name')
      .isLength({ min: 3 })
      .matches(/^[a-zA-Z0-9]+$/),
  ],
  async (req, res) => {
    console.log('router post');
    // Extract the validation errors from a request.

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('get_UserProfileLimited validation', errors.array());

      return httpError('Invalid data', 400);
    }

    try {
      // encrypt password
      const salt = bcrypt.genSaltSync(10);
      const pwd = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: pwd,
        countryid: req.body.countryid,
      });

      // Check if username is already taken:
      const existingUser = await User.findOne({ name: newUser.name });

      if (existingUser) {
        throw new Error('Username already taken');
      }

      // Save the new user if the username is not taken
      await newUser.save();
      res.json({ message: 'User saved to the database' });
    } catch (error) {
      console.error('Error:', error.message);

      if (error.message === 'Username already taken') {
        res.status(400).json({ error: 'Username already taken' });
      } else {
        res.status(500).json({ error: 'An error occurred' });
      }
    }
  }
);

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      countryid: req.body.countryid,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User updated in the database' });
    })
    .catch((err) => {
      console.error('Error updating user in the database', err);
      res.status(500).json({ error: 'Error updating user in the database' });
    });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted from the database' });
    })
    .catch((err) => {
      console.error('Error deleting user from the database', err);
      res.status(500).json({ error: 'Error deleting user from the database' });
    });
});

export default router;
