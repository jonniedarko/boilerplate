require('angular');
require('angular-ui-router');
var Auth = require('./auth/auth.service');
var AuthControllers = require('./auth/auth.controllers');
var AuthInterceptor = require('./auth/auth.controllers');
var CommonServices = require('./services')
var Home = require('./home')
var Add = require('./add')
var navBar = require('./components/navbar')

angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.interceptors.push('TokenInterceptor');

  $urlRouterProvider.otherwise('/');

  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller:'homeCtrl',
        loginRequired: true
  })

  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
  .state('add', {
    // we'll get to this in a bit
    url: '/add',
    templateUrl: 'templates/add.html',
    controller: 'addCtrl',
        loginRequired: true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signUpCtrl'
  });

})
    .run(['$location','$rootScope','AuthService',function ($location, $rootScope, AuthService) {
      var postLogInRoute;

      $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        //if login required and you're logged out, capture the current path
        if (nextRoute.loginRequired && !AuthService.checkIsLoggedIn()) {
          postLogInRoute = $location.path();
          $location.path('/login').replace();
        } else if (postLogInRoute && AuthService.checkIsLoggedIn()) {
          //once logged in, redirect to the last route and reset it
          $location.path(postLogInRoute).replace();
          postLogInRoute = null;
        }
      });
	}])
.factory('TokenInterceptor', require('./auth/http.interceptor'))
.service('AuthService', Auth.AuthService)
.service('UserService', Auth.UserService)
.controller('loginCtrl', AuthControllers.login)
.controller('signUpCtrl', AuthControllers.signUp)
.controller('homeCtrl', Home.controller)
.controller('addCtrl', Add.controller)
.factory('restService', CommonServices.Rest)
.directive('navBar', navBar)
