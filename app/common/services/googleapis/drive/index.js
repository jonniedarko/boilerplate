angular = require('angular');


const DriveApi = ['$http', function DriveApiFn($http){

  return {
    list: function(){
      return $http.get('/api/g/drive');
    },
    create: function(title){
      return $http.post('/api/g/drive', {title: title});
    }

  }
}];

module.exports =
	angular.module('googleapis.Drive', [])
		.factory('driveService', DriveApi);
