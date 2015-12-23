angular = require('angular');
require('./auth.service');
require('./auth.interceptor');

module.exports = angular.module('Auth', ['Auth.AuthService', 'Auth.Interceptor']);
