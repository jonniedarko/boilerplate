var express = require('express');
var router = express.Router();

var Auth = require('./auth');
var User = require('./user');
var sheets = require('./workout');
var google = require('./googleapis');

router.get('/api/user', Auth.middleware.isAuthenticated, function (req, res) {
	res.status(200).json(req.user.toJSON());
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

router.use('/api/sheet', sheets.routes);

router.use('/api/g', google);

module.exports = router;
