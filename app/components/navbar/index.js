//var path = require('path');
module.exports = ['UserService', 'AuthService', function(UserService, AuthService) {
  return {
      scope:{},
      restrict: 'EA',
      templateUrl: './components/navbar/navbar.template.html',//path.join(__dirname, 'index'),
      link: function(scope){
        scope.redirect = function(){
          // redirect to...
        }
          scope.logout = function(){
              debugger;
              UserService.logOut()
                  .success(console.info)
                  .error(console.error)
          }
      }
  };
}];