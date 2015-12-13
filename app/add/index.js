module.exports.controller = ['$scope', 'restService', function addCtrl($scope, restService){
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
}]
