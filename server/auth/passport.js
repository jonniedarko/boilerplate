var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var secrets = require('../../config/secrets');

var User = require('../user').model;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  email = email.toLowerCase();
  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      return done(null, false, { message: 'Email ' + email + ' not found'});
    }
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid email or password.' });
      }
    });
  });
}));

/**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy(secrets.google, function(req, accessToken, refreshToken, profile, done) {
  console.log('passport access_token', accessToken);
  console.log('passport refresh_token', refreshToken);
  if (req.user) {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
       // req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
        done(err);
      } else {
        User.findById(req.user.id, function(err, user) {
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken, refreshToken: refreshToken });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.image.url;
          user.save(function(err) {
            //req.flash('info', { msg: 'Google account has been linked.' });
            done(err, user);
          });
        });
      }
    });
  } else {
    User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      User.findOne({ email: profile.emails[0].value }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          //req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
          done(err);
        } else {
          var user = new User();
          user.email = profile.emails[0].value;
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken, refreshToken: refreshToken  });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.image.url;
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
  }
}));
