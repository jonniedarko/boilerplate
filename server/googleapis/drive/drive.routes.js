'use strict';
var _ = require('lodash');
const Drive = require('./drive.controller');
const express = require('express');
var router = express.Router();



function getSpreadSheetList(req, res, next){
	var token = _.find(req.user.tokens, {
		kind: 'google'
	});

	Drive.listSpreadSheets(token)
		.then(function (results){
			res.status(200).json(results)
		})
		.catch(function(err){
			res.status(500).json(err)
		})
}

function createSpreadSheet(req, res, next){

	var token = _.find(req.user.tokens, {
		kind: 'google'
	});

	Drive.createNewSpreadSheet(token, req.body.title)
		.then(function (results){
			res.status(200).json(results)
		})
		.catch(function(err){
			res.status(500).json(err)
		})
}

router.get('/', getSpreadSheetList);
router.post('/', createSpreadSheet);

module.exports = router;