
const Rest = ['$http', function RestFn($http){

  return {
    getData: function (){
      return $http.get('/api/sheet');
    },
    saveData: function(data){
      return $http.post('/api/sheet', data);
    },
    list: function(){
      return $http.get('/api/sheet/list');
    },
    create: function(data){
      return $http.post('/api/sheet/create', data);
    }

  }
}];

angular = require('angular');

module.exports =
	angular.module('Services.Rest', [])
		.factory('restService', Rest);
