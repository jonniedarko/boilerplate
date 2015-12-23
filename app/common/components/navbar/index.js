//var path = require('path');
//module.exports =
const NavBar = ['UserService', 'AuthService', function NavBarFn(UserService, AuthService) {
    return {
        scope: {},
        restrict: 'EA',
        templateUrl: './components/navbar/navbar.template.html',
        link: function(scope) {

            scope.isLoggedIn = AuthService.isLoggedIn;
            scope.user = AuthService.user;
            scope.logout = UserService.logOut;

            scope.$on('AuthService:changed', function() {
                scope.isLoggedIn = AuthService.isLoggedIn;
                scope.user = AuthService.user;

            });
        }
    };
}];

angular = require('angular');

module.exports = angular.module('Components.NavBar', ['Auth.AuthService'])
						.directive('navBar', NavBar);
