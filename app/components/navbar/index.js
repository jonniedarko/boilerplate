//var path = require('path');
module.exports = ['UserService', 'AuthService', function(UserService, AuthService) {
  return {
      scope:{},
      restrict: 'EA',
      templateUrl: './components/navbar/navbar.template.html',//path.join(__dirname, 'index'),
      link: function(scope){
            scope.user = null;

            UserService.getUserInfo()
                .success(function(data){
                    console.log('arguments', arguments);
                    scope.user = data;
                })
                .error(function(){
                    console.error('arguments', arguments);
                })
          scope.logout = function(){

              UserService.logOut()
                  .success(function(){
                      debugger;
                      console.log('arguments', arguments);
                  })
                  .error(function(){
                      debugger;
                      console.error('arguments', arguments);
                  })
          }
      }
  };
}];
