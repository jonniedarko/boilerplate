const loginCtrl = ['$scope', 'UserService', function($scope, UserService) {
    $scope.form = {};


    $scope.login = function() {
        UserService.logIn($scope.form.email, $scope.form.password).then(function() {
                console.log('logged In')
            },
            function(err) {
                console.error('Error', err)
            });
    }

    $scope.googleLogin = function() {
        UserService.googleLogin()

    }

}];

module.exports = angular.module('Routes.Login', [])
				.controller('loginCtrl', loginCtrl);