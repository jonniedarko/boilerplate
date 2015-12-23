require('angular');
require('angular-ui-router');
//var AuthModule =
require('./auth');
var AuthControllers = require('./auth/auth.controllers');
//var AuthInterceptor = require('./auth/auth.controllers');
var CommonServices = require('./services')
var Home = require('./home')
var Add = require('./add')
var navBar = require('./components/navbar')


angular.module('app', ['ui.router','Auth'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');

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
   .state('logout', {
     url: 'logut',
	 resolve: {
		logout: ['AuthService','$state', function(UserService, $state){

			UserService.logOut(function(){
				$state.go('login');
			})

		}]
	 }
     //templateUrl: 'templates/login.html',
     //controller: 'loginCtrl'
   })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signUpCtrl'
  });

})
    .run(['$location','$rootScope','AuthService',function ($location, $rootScope, AuthService) {
      /*var postLogInRoute;
	  $rootScope.isLoggedIn = AuthService.isLoggedIn;
	  $rootScope.user = AuthService.user;
	  $rootScope.$watch(AuthService.isLoggedIn, function(nw,old){
		  console.log('AuthService.isLoggedIn changed', nw, old);
	  })
	  $rootScope.$watch(AuthService.user, function(nw,old){
		console.log('AuthService.user changed', nw, old);
	})*/

      /*AuthService.sessionExists()
          .success(function(){
            AuthService.setLoggedIn(true);
          })*/

      $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {

        //if login required and you're logged out, capture the current path
        if (nextRoute.loginRequired && !AuthService.isLoggedIn) {
          postLogInRoute = $location.path();
          $location.path('/login').replace();
        } else if (postLogInRoute && AuthService.isLoggedIn) {
          //once logged in, redirect to the last route and reset it
          $location.path(postLogInRoute).replace();
          postLogInRoute = null;
        }
      });
	}])
/*.factory('TokenInterceptor', require('./auth/http.interceptor'))
.service('AuthService', Auth.AuthService)
.factory('UserService', Auth.UserService)*/
.controller('loginCtrl', AuthControllers.login)
.controller('signUpCtrl', AuthControllers.signUp)
.controller('homeCtrl', Home.controller)
.controller('addCtrl', Add.controller)
.factory('restService', CommonServices.Rest)
.directive('navBar', navBar)
