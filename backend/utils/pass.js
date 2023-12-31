'use strict';
import { config } from 'dotenv';
config();
// console.log('dot env:'+process.env.JWT_SECRET);

// Import necessary modules and dependencies
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-local';
import passportJWT from 'passport-jwt'; // Import passport-jwt module directly
import User from '../models/User.js'; // Import the User model
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Define a local strategy for username and password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      // Find a user in the database with the provided username
      const user = await User.findOne({ name: params });
      //console.log(params, 'paramsasdasd');
      //console.log('Local strategy', user); // Log the user (result is a binary row)

      // Check if the user exists
      if (user === undefined) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      // Compare the provided password with the stored password using bcrypt
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Convert the Mongoose document to a plain JavaScript object
      const userObject = user.toObject();

      // Delete the password property from the user object
      delete userObject.password;

      return done(
        null,
        { ...userObject },
        { message: 'Logged In Successfully' }
      );
    } catch (err) {
      return done(err);
    }
  })
);

// Define a JWT strategy for handling JSON Web Tokens
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      console.log('JWTStrategy', jwtPayload); // Log the JWT payload
      done(null, jwtPayload); // Pass the JWT payload as the authenticated user
    }
  )
);

export default passport; // Export passport as the default export
