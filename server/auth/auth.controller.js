var User = require('../user');
var UserCtrl = User.controller;
var passport = require('passport');
/**
 * POST /login
 * Sign in using email and password.
 */
exports.login = function(req, res, next) {
  console.log('login body', req.body);

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Username or Password is incorrect');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
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
  console.log('UserCtrl', UserCtrl);

  UserCtrl.signUp(req.body.email, req.body.password)
      .then(function(user){
         req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.status(200).end();
        });
      })
      .catch(function(err){
        if (err) {
          return next(err);
        }

      });
};

exports.logout = function(req, res, next){

  req.logout();

  res.status(200).end();
};

