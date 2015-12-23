require('angular');
require('angular-ui-router');

/*require('./auth');
require('./components')
require('./services')*/
require('./common');
var AuthControllers = require('./common/auth/auth.controllers');

var Home = require('./home')
var Add = require('./add')



angular.module('app', ['ui.router', 'Auth', 'Components', 'Services'])
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');

        $urlRouterProvider.otherwise('/');

        $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl',
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
                    logout: ['AuthService', '$state', function(UserService, $state) {

                        UserService.logOut(function() {
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
    .run(['$location', '$rootScope', 'AuthService', function($location, $rootScope, AuthService) {

        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

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

    .controller('loginCtrl', AuthControllers.login)
    .controller('signUpCtrl', AuthControllers.signUp)
    .controller('homeCtrl', Home.controller)
    .controller('addCtrl', Add.controller)
