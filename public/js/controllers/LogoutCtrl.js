/**
 * Created by PHI on 5/23/2015.
 */
angular.module('LogoutCtrl',[])
    .controller('LogoutController',[
        function($scope,$location,$rootScope){
            $rootScope.authenticate==false;
            $location.path('/');
        }
    ]);