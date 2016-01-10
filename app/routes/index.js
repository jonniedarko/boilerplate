require('./login');
require('./signup');
require('./logout');
require('./home');
require('./add');
require('./tracker');

module.exports = angular.module('Routes',['Routes.Login', 'Routes.SignUp', 'Routes.Home', 'Routes.Add', 'Tracker'])
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
            .state('tracker',{
                url: '/tracker',
                templateUrl: 'templates/trackerList.html',
                controller: 'trackerListCtrl',
                controllerAs: 'trackerListVm',
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
    }]);