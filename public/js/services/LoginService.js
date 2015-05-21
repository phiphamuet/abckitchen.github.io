/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginService', []).factory('Login', ['$http','$location', function($http,$location) {
    return function(value){
        $http.post('/login',value)
            .success(function(data){
                if(data.type=='error'){
                    console.log(data);
                }else{
                    $location.path('/user');
                }
            })
            .error(function(data){

            });
    }
}]);