var Auth = require('./auth');
var passport = require('passport');

module.exports = function(app) {

  // Insert routes below
  app.get('/api/data', Auth.isAuthenticated, function(req, res){
    return res.status(200).json({
      data : [
        [1,2,3,4,5,6],
        [1,2,3,4,5,6],
        [1,2,3,4,5,6]
      ]
    });
  });

  app.get('/api/user', Auth.isAuthenticated, function (req,res){

    console.log('BLAH');

    /*var user = req.user.profile;

    user.email = req.user.email;*/
    res.status(200).json(req.user.toJSON());
  });

  app.post('/api/data', function(req, res){
    console.log('body', req.body);
    res.status(200).end();
  });
  app.get('/api/auth', function(req, res){
      if(req.isAuthenticated()){
        return res.status(200).json(true);
      }
    return res.status(401).end();
  });
  app.post('/api/auth/signup', Auth.signup);
  app.post('/api/auth/login', Auth.login);
  app.post('/api/auth/logout', Auth.logout);

  app.get('/auth/google', passport.authenticate('google', { scope: [
    'profile',
    'email',
    'https://spreadsheets.google.com/feeds',
    'https://docs.google.com/feeds'
  ].join(' '), accessType: 'offline', approvalPrompt: 'force' }));

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/#/login' }), function(req, res) {
    res.redirect('/'); //req.session.returnTo ||
  });

};
