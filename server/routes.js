var express = require('express');


var router = express.Router();

var Auth = require('./auth');
var User = require('./user');

// Insert routes below
router.get('/api/data', Auth.middleware.isAuthenticated, function (req, res) {
	return res.status(200).json({
		data: [
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6],
			[1, 2, 3, 4, 5, 6]
		]
	});
});

router.get('/api/user', Auth.middleware.isAuthenticated, function (req, res) {
	res.status(200).json(req.user.toJSON());
});

router.post('/api/data', function (req, res) {
	console.log('body', req.body);
	res.status(200).end();

});
router.get('/api/auth', function (req, res) {
	if (req.isAuthenticated()) {
		return res.status(200).json(true);
	}
	return res.status(401).end();
});

router.use('/api/user', User.routes);
router.use('/api/auth', Auth.routes);
router.use('/', Auth.oauth2);
module.exports = router;
