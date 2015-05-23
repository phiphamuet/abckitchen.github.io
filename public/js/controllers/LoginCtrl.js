/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginCtrl', ['LoginService'])
    .controller('LoginController',['Login','$rootScope','$scope','$location',
        function($scope,$rootScope,Login,$location){
            if($rootScope.authenticate==true){
                $location.path('/user');
            }
            $scope.login=function() {
                Login($scope.form);
            }
        }
    ]);