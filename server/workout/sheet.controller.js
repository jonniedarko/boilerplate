var _ = require('lodash');
var Q = require('q');
var config = require('../../config');

var Spreadsheet = require('edit-google-spreadsheet');

module.exports.getSheet = function getSheet(token, spreadSheet) {
	var deferred = Q.defer();

	var options = {
		debug: true,
		oauth2: {
			client_id: config.google.clientID,
			client_secret: config.google.clientSecret,
			refresh_token: token.refreshToken
		}

	};
	if (spreadSheet.spreadsheetId) options.spreadsheetId = spreadSheet.spreadsheetId;
	if (spreadSheet.worksheetId) options.worksheetId = spreadSheet.worksheetId;
	if (spreadSheet.spreadsheetName) options.spreadsheetName = spreadSheet.spreadsheetName
	if (spreadSheet.worksheetName) options.worksheetName = spreadSheet.worksheetName;

	Spreadsheet.load(options, function read(err, spreadsheet) {
		if (err) throw err;

		spreadsheet.receive(function (err, rows, info) {
			if (err) {
				//console.log('error', err);
				///res.status(500).json({error: err});
				deferred.reject(err)
			} else if (rows == null || (rows.length && rows.length < 1)) {
				deferred.reject({message: '0 rows'});
			}


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
			/*, rows: rows*/
			//res.status(200).json({user: req.user, results: results});
			deferred.resolve(results);
			// Found rows: { '3': { '5': 'hello!' } }
		});

	});

	return deferred.promise
};


function Add(err, spreadsheet) {
	//use speadsheet!
	if (err) {
		console.error('SheetReady Error: ', err);
		req.flash('errors', {
			msg: err.message
		});
		return res.redirect('/api');
	}

	spreadsheet.add({1: {1: "hello!"}});

	spreadsheet.send(function (err) {
		if (err) {
			console.error('SheetReady recieve Error: ', err);
			req.flash('errors', {
				msg: err.message
			});
			return res.redirect('/api');
		}
		req.flash('info', {
			msg: 'Done!'
		});
		console.log("Updated Cell at row 3, column 5 to 'hello!'");
		return res.redirect('/api');
	});
}

function read(err, spreadsheet) {
	if (err) throw err;

	spreadsheet.receive(function (err, rows, info) {
		if (err) throw err;
		console.log("Found rows:", rows);
		// Found rows: { '3': { '5': 'hello!' } }
	});

}