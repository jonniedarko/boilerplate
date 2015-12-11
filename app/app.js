angular.module('app', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller:'homeCtrl'
  })

  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
  .state('add', {
    // we'll get to this in a bit
    url: '/add',
    templateUrl: 'templates/add.html',
    controller: 'addCtrl'
  });

})

  .controller('homeCtrl', function($scope, restService){
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

  })
  .controller('addCtrl', function($scope, restService){
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
  })
  .factory('restService', function ($http){

    return {
      getData: function (){
        return $http.get('/api/data');
      },
      saveData: function(data){
        return $http.post('/api/data', data);
      }

    }


  });
