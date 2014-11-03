/**
 * Created by rodrigopavezi on 10/15/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("AppManagementController",
    ["$scope", "$state","listApps", "userState", "deleteApp", "$loading", function($scope, $state, listApps, userState, deleteApp, $loading){
        $scope.apps = [];
        $scope.showNoAppMessage = true;
        $scope.loadingComplete = false;

        var toogleMessageAndTable = function(){
            if($scope.apps != null && $scope.apps.length > 0){
                $scope.showNoAppMessage = false;
                $scope.showAppTable = true;
            }else{
                $scope.showNoAppMessage = true;
                $scope.showAppTable = false;
            }
        };

        var loadApps = listApps(userState.getUserCompanyId())
            .then(function (apps) {
                $scope.apps = apps;
                $scope.loadingComplete = true;
                toogleMessageAndTable();
            }, function() {
                $scope.loadingComplete = true;
            });

        $loading.stopSpinnerAfterPromise("rv-dev-hub-apps-loader", loadApps);


        $scope.addNewApp = function() {
            $state.go("apps.add");
        };

        $scope.editApp = function(id) {
            $state.go("apps.edit", {id: id});
        };

        $scope.deleteApp = function(id) {
            deleteApp(id).then(function(result) {
                $scope.apps.splice(id,1);

                toogleMessageAndTable();
            });
        };
    }]);