/**
 * Created by Phi on 5/26/2015.
 */
var app=angular.module('User',['datatables','datatables.bootstrap','ui.bootstrap']);
app.controller('getList',function($scope,$http,$modal){
    $http.get('/manager/user/list')
        .success(function(data){
            data.forEach(function(val){
                var now=new Date(val.birthdate);
                val.birthdate=now.toLocaleDateString();
            })
            $scope.list=data;
        })
        .error(function(data){
            console.log(data);
        })
    $scope.Response = function (size,content) {
        var modalInstance = $modal.open({
            templateUrl: 'response',
            controller: 'Response',
            size: size,
            resolve: {
                content: function () {
                    return content;
                }
            }
        });
    };
    $scope.openDelete = function (size,data) {
        var modalInstance = $modal.open({
            templateUrl: 'delete',
            controller: 'DeleteModalInstanceCtrl',
            size: size,
            resolve: {
                ans: function(){
                    return data;
                }
            }
        });
        modalInstance.result.then(function (data) {
            $http.delete('/manager/user/delete/'+data)
                .success(function(response){
                    $scope.Response('lg',response.content);
                }).error(function(response){
                    console.log(response);
                })
        }, function () {

        });
    };
});
app.controller('DeleteModalInstanceCtrl', function ($scope, $modalInstance, ans) {
    $scope.user=ans;
    $scope.ok = function () {
        var data=ans;
        $modalInstance.close(data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
app.controller('Response', function ($scope, $modalInstance, content) {

    $scope.content = content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
app.controller('controlUser',function($scope,$http){
    $scope.add=function(){
        $http.post('/manager/user/new',$scope.form)
            .success(function(data){
                $scope.rp=data.content;
            })
            .error(function(data){
                console.log(data);
            })
    }
    $scope.reset=function(){
        $scope.form=angular.copy({});
    }
});