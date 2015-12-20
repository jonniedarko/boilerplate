var User = require('../models/user');
var passport = require('passport');
/**
 * POST /login
 * Sign in using email and password.
 */
exports.login = function(req, res, next) {
  console.log('login body', req.body);
  //req.assert('email', 'Email is not valid').isEmail();
  //req.assert('password', 'Password cannot be blank').notEmpty();

  //var errors = req.validationErrors();

  /*if (errors) {
  //  req.flash('errors', errors);
    return res.redirect('/login');
}*/

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
    //  req.flash('errors', { msg: info.message });
      return res.status(401).send('Username or Password is incorrect')//res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
    //  req.flash('success', { msg: 'Success! You are logged in.' });
      //res.redirect(req.session.returnTo || '/');
      console.log('session',req.session)
      res.status(200).send(req.session.passport.user)
    });
  })(req, res, next);
};


/**
 * GET /signup
 * Signup page.
 */
exports.signup = function(req, res, next) {
  //req.assert('email', 'Email is not valid').isEmail();
  //req.assert('password', 'Password must be at least 4 characters long').len(4);
  //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  //var errors = req.validationErrors();

  /*if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }*/
  console.log('signup body', req.body);

  var user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {
    //  req.flash('errors', { msg: 'Account with that email address already exists.' });
       return res.status(409).send('That email is already Registered')
    }
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        res.status(200).end();
      });
    });
  });
};

exports.logout = function(req, res, next){

  req.logout();

  res.status(200).end();
}

exports.isAuthenticated = function(req, res, next) {
  console.log('isAuthenticated?')
  if (req.isAuthenticated()) {
    console.log('isAuthenticated TRUE');
    return next();
  }
  res.status(401).end();
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
