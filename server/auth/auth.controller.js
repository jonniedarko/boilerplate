//var User = require('../models/user');
var UserCtrl = require('../user').controller;
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
    //  req.flash('errors', { msg: info.message });
      return res.status(401).send('Username or Password is incorrect')//res.redirect('/login');
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

