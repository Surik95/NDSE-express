import express from 'express';
const router = express.Router();
import passport from '../middlewere/passport.js';
import Profile from '../database/profile.js';
import User from '../models/users.js';

// const app = express();
// app.use(passport.initialize());
// app.use(passport.session());
// let user = null;

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    session: true,
    failureRedirect: `${process.env.URL_HOME}api/user/login`,
  }),
  (req, res) => {
    console.log('req.user: ', req.user);
    res.redirect(`${process.env.URL_HOME}api/books/`);
  }
);

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const user = new User(new Profile(req.body));
  if (req.body.login && req.body.password) {
    try {
      await user.save();
    } catch (e) {
      res.status(500).json(e);
    }
    // app.set('message', true);
  }
  // res.redirect(`${process.env.URL_HOME}api/books/`);
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.URL_HOME}api/books/`);
  });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get(
  '/profile',
  (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
      return res.redirect(`${process.env.URL_HOME}api/user/login`);
    }
    next();
  },
  (req, res) => {
    res.render(`auth/profile`, { user: req.user });
  }
);
// export { user };
export default router;
