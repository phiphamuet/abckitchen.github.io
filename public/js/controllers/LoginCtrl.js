/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginCtrl', ['LoginService'])
    .controller('LoginController',['Login',
        function($scope,Login,$location){
            if($scope.authenticate==true){
                $location.path('/user');
            }
            $scope.login=function() {
                Login($scope.form);
            }
        }
    ]);