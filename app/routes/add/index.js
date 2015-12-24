const addCtrl = ['$scope', 'restService', function addCtrlFn($scope, restService){
  $scope.form = {};
   $scope.save = function(){
     restService.saveData($scope.form)
      .success(function(){
          $scope.form = {};
      })
      .error(function (err){
        console.error(err);
      })
   }
}];

module.exports = angular.module('Routes.Add', [])
				.controller('addCtrl', addCtrl);