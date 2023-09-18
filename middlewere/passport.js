import passport from 'passport';
import strategy from 'passport-local';
const LocalStrategy = strategy.Strategy;
import { findById, findByUsername, verifyPassword } from '../database/users.js';

const verify = (login, password, done) => {
  findByUsername(login, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (!verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  });
};

const options = {
  usernameField: 'user',
  passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  console.log(user.id);
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

export default passport;
