
const Rest = ['$http', function RestFn($http){

  return {
    getData: function (){
      return $http.get('/api/sheet');
    },
    saveData: function(data){
      return $http.post('/api/sheet', data);
    },

    //@todo remove
    list: function(){
      return $http.get('/api/g/drive');
    },
    create: function(data){
      return $http.post('/api/g/drive', data);
    }

  }

}];

angular = require('angular');

module.exports =
	angular.module('Services.Rest', [])
		.factory('restService', Rest);
