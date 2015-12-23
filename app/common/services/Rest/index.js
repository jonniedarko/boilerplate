
const Rest = ['$http', function RestFn($http){

  return {
    getData: function (){
      return $http.get('/api/data');
    },
    saveData: function(data){
      return $http.post('/api/data', data);
    }

  }
}];

angular = require('angular');

module.exports =
	angular.module('Services.Rest', [])
		.factory('restService', Rest);
