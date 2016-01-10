require('./Rest');
require('./googleapis');

module.exports =
	angular.module('Services', ['Services.Rest', 'GoogleApis']);
