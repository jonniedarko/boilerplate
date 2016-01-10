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
function addToWorkoutSheet(req, res, next){

	var token = _.find(req.user.tokens, {
		kind: 'google'
	});
	var spreadSheet = {
		//spreadsheetName: 'test_node',
		spreadsheetId: "1qZnfh0gu7OAqVqRmpuutf-nwwD5-euWPR_sJv09q1Fo",
		// worksheetName: 'workout_transactions',
		worksheetId: "od1xlm5",
	};

	Sheets.addToSheet(token, spreadSheet, req.body)
		.then(function (results) {
			res.status(200).json(results)
		})
		.catch(function (err) {
			res.status(500).json(err)
		})

	//res.status(200).json('results')

}

function getFileList(req, res, next){
	var token = _.find(req.user.tokens, {
		kind: 'google'
	});

	var query = "mimeType = 'application/vnd.google-apps.spreadsheet'"


	Sheets.getFileList(token, query)
		.then(function (results){
			res.status(200).json(results)
		})
		.catch(function(err){
			res.status(500).json(err)
		})
}

function createNewFile(req, res, next){

	var token = _.find(req.user.tokens, {
		kind: 'google'
	});

	Sheets.createNewSheet(token, req.body.title)
		.then(function (results){
			res.status(200).json(results)
		})
		.catch(function(err){
			res.status(500).json(err)
		})
}

router.get('/', getWorkoutSheet);
router.post('/', addToWorkoutSheet);
router.get('/list', getFileList)
router.post('/create', createNewFile);

module.exports = router;