var app=angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'AboutCtrl', 'UserService','UserCtrl','LoginService','LoginCtrl','LogoutCtrl']);
app.run(['$rootScope',function($rootScope){
    $rootScope.authenticate=false;
}]);