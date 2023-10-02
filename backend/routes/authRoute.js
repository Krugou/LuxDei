'use strict';
const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');
const {body} = require('express-validator');

router.post('/login',
    body('username').escape(),
    body('password').escape(),login)


module.exports = router;