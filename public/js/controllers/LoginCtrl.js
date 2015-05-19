/**
 * Created by PHI on 5/19/2015.
 */
angular.module('LoginCtrl', [])
    .controller('LoginController',['$scope','Login',
        $scope.login=function($scope,Login) {
            Login($scope.form);
        }
    ]);