module.exports.Rest = ['$http', function ($http){

  return {
    getData: function (){
      return $http.get('/api/data');
    },
    saveData: function(data){
      return $http.post('/api/data', data);
    }

  }
}]
