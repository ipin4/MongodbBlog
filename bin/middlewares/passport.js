import passport from 'passport';
import User from '../schema/User';
import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField: 'username'},
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) return done(null, false, { message: 'Username is not exist.' });
      if (user.password == password) return done(null, user);

      return done(null, false, { message: 'Incorrect password.' });
    });
  }
));

export const userLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  if (req.xhr) return res.status(401).send('Unauthorized');

  return res.redirect('/login');
};
