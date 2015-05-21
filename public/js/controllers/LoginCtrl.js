/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginCtrl', ['LoginService'])
    .controller('LoginController',['$scope','Login',
        function($scope,Login){
            $scope.login=function() {
                Login($scope.form);
            }
        }
    ]);