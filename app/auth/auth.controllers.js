module.exports.login = ['$scope', 'UserService', function($scope, UserService) {
  $scope.login = UserService.login($scope.form.username, $scope.form.password).success(function() {
      console.log('logged In')
    })
    .error(function(err) {
      console.error('Error', err)
    });

}]

module.exports.signUp = ['$scope', 'UserService', function($scope, UserService) {
  $scope.form = {};
  $scope.login = function(){
    if ($scope.form.password === $scope.form.confirmPassword) {
      $scope.login = UserService.signUp($scope.form.username, $scope.form.password).success(function() {
          console.log('signed up')
        })
        .error(function(err) {
          console.error('Error', err)
        });
    }
  }

}]
