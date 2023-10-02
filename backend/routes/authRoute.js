'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
const router = express.Router();

// Define a separate function for handling passport authentication
const authenticate = (req, res, next) => {
  console.log('authenticate maan');
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('info: ', info);
    console.log('err1: ', err);
    if (err || !user) {
      next(httpError('Virhe kirjautuessa', 403));
      return;
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        console.log('err2: ', err);
        next(httpError('Virhe kirjautuessa', 403));
        return;
      }
      const token = jwt.sign(user, 'väliaikainenkusetus');
      res.json({ user, token });
    });
  })(req, res, next);
};

// Define validation and error handling for the login route
router.post(
  '/login',
  [body('username').escape(), body('password').escape()],
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors.
      // Error messages can be returned in an array using `errors.array()`.
      console.error('Login validation errors', errors.array());
      return res.status(400).json({
        message: 'Invalid data',
        errors: errors.array(),
      });
    }

    // Call the authenticate function to handle passport authentication
    authenticate(req, res, next);
  }
);

export default router;
