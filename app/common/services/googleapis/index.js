angular = require('angular');
require('./drive');

module.exports =
	angular.module('GoogleApis', ['googleapis.Drive'])
		//.factory('restService', Rest);
