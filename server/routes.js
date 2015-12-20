var Auth = require('./auth');

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

  app.post('/api/data', function(req, res){
    console.log('body', req.body);
    res.status(200).end();
  });

  app.post('/api/auth/signup', Auth.signup);
  app.post('/api/auth/login', Auth.login);
  app.post('/api/auth/logout', Auth.logout);

};
