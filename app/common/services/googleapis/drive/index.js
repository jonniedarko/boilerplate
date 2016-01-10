angular = require('angular');


const DriveApi = ['$http', function DriveApiFn($http){

  return {
    list: function(){
      return $http.get('/api/g/drive');
    },
    create: function(data){
      return $http.post('/api/g/drive', data);
    }

  }
}];

module.exports =
	angular.module('googleapis.Drive', [])
		.factory('driveService', DriveApi);
