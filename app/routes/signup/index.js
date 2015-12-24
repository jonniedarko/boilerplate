const signUpCtrl = ['$scope', 'UserService', function signUpCtrlFn($scope, UserService) {
    $scope.form = {};
    $scope.signup = function() {

        if ($scope.form.password === $scope.form.confirmPassword) {
            $scope.login = UserService.signUp($scope.form.email, $scope.form.password).success(function() {
                    console.log('signed up')
                })
                .error(function(err) {
                    console.error('Error', err)
                });
        }
    }

}]

module.exports = angular.module('Routes.SignUp', [])
				.controller('signUpCtrl', signUpCtrl);