/**
 * Created by Phi on 5/26/2015.
 */
var app=angular.module('User',['datatables','datatables.bootstrap','ui.bootstrap']);
app.controller('getList',function($scope,$http,$modal){
    //get user list
    $scope.listUser=function(){
        $http.get('/manager/user/list')
            .success(function(data){
                data.forEach(function(val){
                    var now=new Date(val.birthdate);
                    val.birthdate=now;
                    val.birthdate_show=now.toLocaleDateString();
                })
                $scope.list=data;
            })
            .error(function(data){
                console.log(data);
            })
    };
    //run
    $scope.listUser();
    //response to screen
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
    //delete user
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
                    $scope.listUser();
                }).error(function(response){
                    console.log(response);
                })
        }, function () {

        });
    };
    $scope.openEdit = function (size,data) {
        var modalInstance = $modal.open({
            templateUrl: 'edit',
            controller: 'EditModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });
        modalInstance.result.then(function (data) {
            $http.put('/manager/user/update',data)
                .success(function(response){
                    $scope.listUser();
                    $scope.Response('lg',response.content);
                }).error(function(response){
                    console.log(response);
                })
        }, function () {

        });
    };
});
app.controller('DeleteModalInstanceCtrl', function ($scope, $modalInstance, ans) {
    $scope.user=ans.username;
    $scope.ok = function () {
        var data=ans;
        $modalInstance.close(data.username);
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
app.controller('EditModalInstanceCtrl', function ($scope, $modalInstance, items) {

    $scope.form = items;


    $scope.ok = function () {
        $modalInstance.close($scope.form);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});