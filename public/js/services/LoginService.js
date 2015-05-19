/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginService', []).factory('Login', ['$http','$location', function($http,$location) {
    return function(data){
        $http.post('/login',data)
            .success(function(data){
                if(type=='error'){

                }else{
                    $location.path('/user');
                }
            })
    }
}]);