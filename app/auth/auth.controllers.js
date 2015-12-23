module.exports.login = ['$scope', 'UserService', function($scope, UserService) {
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

}]

module.exports.signUp = ['$scope', 'UserService', function($scope, UserService) {
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
