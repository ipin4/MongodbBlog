import User from '../schema/User';
import passport from  'passport';

export const userRoutes = (app, db, next) => {
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get('/register', (req, res) => {
    res.render('register');
  })


  app.post('/register', (req, res, next) => {
    let user = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      created_at: new Date(),
    });

    User.findOne({username: req.body.username})
      .then((existingUser) => {
        if (existingUser) {
          const error = 'User is already exist.';
          res.render('register', {error});
        }

        return user.save((err) => {
          if (err) {
            return next(err);
          }

          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }

            res.redirect('/blogs');
          })
        });
      })
      .catch(next);
  });

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/login');
      }

      req.logIn(user, (err) => {
       if (err) {
         return next(err);
       }

       return res.redirect('/blogs');
      });
    })(req, res, next);;
  });
}
