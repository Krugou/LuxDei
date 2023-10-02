// routes/userRoutes.js

import express from 'express';
import User from '../models/User.js';

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

router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
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
    console.log('Error:', error.message);
    if (error.message === 'Username already taken') {
      res.json({error.message});
    } else {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
});

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
