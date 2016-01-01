var _ = require('lodash');
var Q = require('q');
var router = require('express').Router();

var config = require('../../config');
var Sheets = require('./sheet.controller');

function getWorkoutSheet(req, res, next) {
	var token = _.find(req.user.tokens, {
		kind: 'google'
	});
	var spreadSheet = {
		//spreadsheetName: 'test_node',
		spreadsheetId: "1qZnfh0gu7OAqVqRmpuutf-nwwD5-euWPR_sJv09q1Fo",
		// worksheetName: 'workout_transactions',
		worksheetId: "od1xlm5",
	}

	Sheets.getSheet(token, spreadSheet)
		.then(function (results) {
			res.status(200).json(results)
		})
		.catch(function (err) {
			res.status(500).json(err)
		})

}

router.get('/', getWorkoutSheet);

module.exports = router;