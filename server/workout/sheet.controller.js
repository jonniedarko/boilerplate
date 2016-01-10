var _ = require('lodash');
var Q = require('q');
var moment = require('moment');
var config = require('../../config');

var google = require('googleapis');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);

var Spreadsheet = require('edit-google-spreadsheet');

module.exports.getFileList = function getFileListFromDrive(token, query) {
	var deferred = Q.defer();

	oauth2Client.setCredentials({
		access_token: token.accessToken,
		refresh_token: token.refreshToken
	});
	var service = google.drive('v2');


	service.files.list({
		auth: oauth2Client,
		maxResults: 10,
		q: query
	}, function (err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			deferred.reject(err);
		}
		deferred.resolve(response);
	});

	return deferred.promise;
}

module.exports.createNewSheet = function createNewSheet(token, title){
	var deferred = Q.defer();

	oauth2Client.setCredentials({
		access_token: token.accessToken,
		refresh_token: token.refreshToken
	});
	var service = google.drive('v2');


	service.files.insert({
		auth: oauth2Client,
		body: {title:title}
	}, function (err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			deferred.reject(err);
		}
		deferred.resolve(response);
	});

}

module.exports.getSheet = function getSheet(token, docDetails) {
	var deferred = Q.defer();

	loadSheet(token, docDetails)
		.then(function(sheet){
			return retrieveSheet(sheet);
		})
		.then(function (doc) {
			deferred.resolve(readSheet(doc.rows));
		})
		.catch(function (err) {
			deferred.reject(err)
		});

	return deferred.promise
};

module.exports.addToSheet = function addToSheet(token, spreadSheet, entry) {
	var deferred = Q.defer();
	loadSheet(token, spreadSheet)
		.then(function(sheet){
			return retrieveSheet(sheet);
		})
		.then(function(doc){
				var nums = Object.keys(doc.rows);
				var numberOfRows = Number(nums[nums.length -1]) + 1;
			debugger;
			return	addTransactionSheet(doc.sheet, entry, numberOfRows, doc.cols)
		})
		.then(function (rows) {
			deferred.resolve(rows);
		})
		.catch(function (err) {
			deferred.reject(err)
		});

	return deferred.promise
};

function addTransactionSheet(spreadsheet, entry, row, cols){

	var deferred = Q.defer();
	//var cols = Object.keys(row1).map(function (key) {return row1[key]});
	var newRow = {};
	//newRow = entry;
	entry.date = new Date();

	 _.each(entry, function(val, key){
		 var i = cols.indexOf(key) + 1;
		 cols[i]
		 newRow[i] = val;
	 });


 var updateObj = {};
	updateObj[row] = newRow;
	//deferred.resolve([spreadsheet, entry, row]);
	spreadsheet.add(updateObj);//newRow);

	spreadsheet.send(function (err) {
		if (err) {
			deferred.reject(err)
		}

		deferred.resolve(spreadsheet);
	});

	return deferred.promise;
}

function readSheet(rows) {


	var array = _.map(rows, function (row, index) {
		return _.map(row, function (value, i) {
			return value;
		});
	});

	var cols = array[0];
	var results = [];
	for (var i = 1, len = array.length; i < len; i++) {

		var row = _.map(array[i], function (value, index) {
			return [value];
		});
		var rowObj = {};
		for (var c = 0, num = cols.length; c < num; c++) {
			try {
				rowObj[cols[c]] = JSON.parse(row[c]);
			} catch (e) {
				if (Array.isArray(row[c]) && row[c].length > 0) {
					rowObj[cols[c]] = row[c][0];
				} else {
					rowObj[cols[c]] = row[c];
				}

			}
		}
		results.push(rowObj);
	}
	return results;
}

function loadSheet(token, docDetails) {
	var deferred = Q.defer();

	var options = {
		debug: true,
		oauth2: {
			client_id: config.google.clientID,
			client_secret: config.google.clientSecret,
			refresh_token: token.refreshToken
		}

	};
	if (docDetails.spreadsheetId) options.spreadsheetId = docDetails.spreadsheetId;
	if (docDetails.worksheetId) options.worksheetId = docDetails.worksheetId;
	if (docDetails.spreadsheetName) options.spreadsheetName = docDetails.spreadsheetName;
	if (docDetails.worksheetName) options.worksheetName = docDetails.worksheetName;

	Spreadsheet.load(options, function read(err, spreadsheet) {
		if (err) deferred.reject('Could not load the spread sheet');

		deferred.resolve(spreadsheet)

	});

	return deferred.promise;
}
function retrieveSheet(spreadsheet){
	var deferred = Q.defer();
	spreadsheet.receive(function (err, rows, info) {
			if (err) {
				//console.log('error', err);
				///res.status(500).json({error: err});
				deferred.reject(err)
			} else if (rows == null || (rows.length && rows.length < 1)) {
				deferred.reject({message: '0 rows'});
			}
			/**
			 *  get number of entries
			 *  column names
			 *  types for each columns
			 *
			 * */
			var nums = Object.keys(rows);
			var numberOfRows = Number(nums[nums.length -1]);
			var columns = Object.keys(rows["2"]).map(function (key) {return rows["2"][key]});
			var types = {};
			_.each(rows["1"], function (val, key){
				types[columns[key]] = val;
			});

			/*, rows: rows*/
			deferred.resolve({rows:rows, currentIndex:numberOfRows, cols:columns, dataTypes:types, sheet:spreadsheet});

		});
	return deferred.promise
}