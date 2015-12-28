var express = require('express');
var router = express.Router();

var Auth = require('../auth');


router.get('/', Auth.middleware.isAuthenticated, function (req, res) {

	res.status(200).json(req.user.toJSON());
});

module.exports = router;