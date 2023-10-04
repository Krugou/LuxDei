'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
const router = express.Router();

router.get('/', (req, res) => {
  try {
    if (req.user) {
      // User info is available, send it as a JSON response
      res.json({ user: req.user });
    } else {
      // User info is not available, send a 403 error response
      res.status(403).json({ error: 'User info not available' });
    }
  } catch (error) {
    // Handle other errors (if any)
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export default router;
