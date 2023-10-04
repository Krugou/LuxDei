'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('put users validation', errors.array());
    res.json({
      message: 'Invalid inputs',
    });
    next(httpError('Invalid data', 400));
    return;
  }
});
export default router;
