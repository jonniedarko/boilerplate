require('./components');
require('./services');
require('./auth');

module.exports = angular.module('Common', ['Common.Components','Common.Services', 'Auth']);
