var express = require('express');
var router = express.Router();

var Auth = require('../auth');
var User = require('./user.routes');

router.get('/', Auth.middleware.isAuthenticated, function (req, res) {

	res.status(200).json(req.user.toJSON());
});
/*
	@todo
	Save Docs and Worksheets with to be used for tracking Data
	Add Meta Data to doc i.e. columns, column types, etc
 */

router.post('/docs',  Auth.middleware.isAuthenticated, function (req, res){

	User.saveDoc(req.user.id, req.user.doc)
		.then(function(){

		})
		.catch(function(){

		})

});

module.exports = router;