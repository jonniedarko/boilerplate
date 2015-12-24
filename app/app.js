require('angular');
require('angular-ui-router');

require('./common');
//var AuthControllers = require('./common/auth/auth.controllers');
require('./routes');
var Home = require('./home')
var Add = require('./add');




angular.module('app', ['ui.router', 'Auth', 'Components', 'Services', 'Routes'])
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
    .controller('homeCtrl', Home.controller)
    .controller('addCtrl', Add.controller)
