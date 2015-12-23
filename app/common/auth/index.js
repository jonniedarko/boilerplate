angular = require('angular');
require('./user.service');
require('./auth.interceptor');

module.exports = angular.module('Auth', ['Auth.UserService', 'Auth.Interceptor']);
