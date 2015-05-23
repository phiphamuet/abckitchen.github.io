/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginService', []).factory('Login', ['$http','$location','$rootScope', function($http,$location,$rootScope) {
    return function(value){
        $http.post('/login',value)
            .success(function(data){
                if(data.type=='error'){
                    console.log(data);
                    $rootScope.authenticate=false;
                }else{
                    $rootScope.authenticate=true;
                    $rootScope.username=data.username;
                    $location.path('/user');
                }
            })
            .error(function(data){

            });
    }
}]);