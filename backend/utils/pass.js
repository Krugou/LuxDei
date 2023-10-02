'use strict';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
//const { findUsersByEmailRegUser } = require('../models/regUserModel');
const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = passportJWT;

// local strategy for username password login
passport.use(
  new Strategy(async (username, password, done) => {
    const params = [username];
    try {
      //const [user] = await findUsersByEmailRegUser(params);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.Userpassword)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      delete user.Userpassword;
      return done(null, { ...user }, { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      console.log('JWTStrategy', jwtPayload);
      done(null, jwtPayload);
    }
  )
);

// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

module.exports = passport;
