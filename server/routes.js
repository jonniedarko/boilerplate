var Auth = require('./auth');

module.exports = function(app) {

  // Insert routes below
  app.get('/api/data', function(req, res){
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
  // All undefined asset or api routes should return a 404
/*  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);*/

  // All other routes should redirect to the index.html
/*  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });*/
};
