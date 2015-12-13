//.controller('homeCtrl',
module.exports.controller = ['$scope', 'restService', function homeCtrl($scope, restService){
  $scope.data = [];
  restService.getData()
  .success(function(data, status, headers, config){
    console.log(data);
    $scope.data = data.data;
  })
  .error(function(err){
    console.error(arguments);
  })
  console.log('I\'m Home')

}]
