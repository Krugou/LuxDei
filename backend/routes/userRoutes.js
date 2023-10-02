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

router.post('/', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    countryid: req.body.countryid,
  });

  // See if username is already taken:
  User.findOne({ name: newUser.name }) // Use findOne to find by username
    .then((user) => {
      if (user) {
        return res.status(400).json({'Username already taken'});
      } else {
        // Save the new user if the username is not taken
        newUser
          .save()
          .then(() => {
            res.json({ message: 'User saved to the database' });
          })
          .catch((err) => {
            console.error('Error saving user to the database', err);
            res
              .status(500)
              .json({ error: 'Error saving user to the database' });
          });
      }
    })
    .catch((err) => {
      console.error('Error getting user from the database', err);
      res.status(500).json({ error: 'Error getting user from the database' });
    });
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
