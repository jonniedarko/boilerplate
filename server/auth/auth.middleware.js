
exports.isAuthenticated = function(req, res, next) {
  console.log('isAuthenticated?');
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
