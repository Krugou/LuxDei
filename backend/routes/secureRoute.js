'use strict';
import jwt from 'jsonwebtoken';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import httpError from '../utils/errors.js';
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    return req.user;
  } catch (error) {
    next(httpError('User info not available', 403));
    return;
  }
  console.log(req.user, 'USER ASDASD');
});
export default router;
