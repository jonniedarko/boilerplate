'use strict';

var _ = require('lodash');
var Q = require('q');
var moment = require('moment');
var config = require('../../../config');
var google = require('googleapis');

var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(config.google.clientID, config.google.clientSecret, config.google.callbackURL);


module.exports.listSpreadSheets = function listSpreadSheetsFn(token) {
	var deferred = Q.defer();

	var query = "mimeType = 'application/vnd.google-apps.spreadsheet'";

	oauth2Client.setCredentials({
		access_token: token.accessToken,
		refresh_token: token.refreshToken
	});
	var service = google.drive('v2');

	/**
	 * Drive v2 api
	 * {
	 *      auth: oauth2Client,
	 *      maxResults: 10,
	 *      q: query
     * }
	 *
	 */

	service.files.list({
		auth: oauth2Client,
		//maxResults: 10,
		q: query
	}, function (err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			deferred.reject(err);
		}
		deferred.resolve(response);
	});

	return deferred.promise;
};

module.exports.createNewSpreadSheet = function createNewSpreadSheetFn(token, title){
	var deferred = Q.defer();

	oauth2Client.setCredentials({
		access_token: token.accessToken,
		refresh_token: token.refreshToken
	});
	var service = google.drive('v2');

	/**
	 * Drive v2 api
	 * {
	 *      auth: oauth2Client,
	 *      resource: {
   	 *          mimeType: "application/vnd.google-apps.spreadsheet",
	 *		    title: title
     *      }
     * }
	 *
	 */

	service.files.insert({
		auth: oauth2Client,
		resource: {
   		    mimeType: "application/vnd.google-apps.spreadsheet",
			title: title
        },

	}, function (err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			deferred.reject(err);
		}
		deferred.resolve(response);
	});

	return deferred.promise;

};