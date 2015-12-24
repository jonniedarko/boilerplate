require('./login');
require('./signup');
require('./logout');
require('./home');
require('./add');

module.exports = angular.module('Routes',['Routes.Login', 'Routes.SignUp', 'Routes.Home', 'Routes.Add'])
.config(function($stateProvider, $urlRouterProvider) {
       // $httpProvider.interceptors.push('AuthInterceptor');

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


        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: 'signUpCtrl'
        });

    });