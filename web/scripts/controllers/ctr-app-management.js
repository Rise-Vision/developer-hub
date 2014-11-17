/**
 * Created by rodrigopavezi on 10/15/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("AppManagementController",
    ["$scope", "$state","listApps", "userState", "$loading", "uiFlowManager", function($scope, $state, listApps, userState, $loading, uiFlowManager){

        $scope.apps = [];
        $scope.showNoAppMessage = true;
        $scope.loadingComplete = false;
        var _id = "";

        var toogleMessageAndTable = function(){
            if($scope.apps != null && $scope.apps.length > 0){
                $scope.showNoAppMessage = false;
                $scope.showAppTable = true;
            }else{
                $scope.showNoAppMessage = true;
                $scope.showAppTable = false;
            }
        };

        $scope.addNewApp = function() {
            uiFlowManager.invalidateStatus("canAddApps");
        };

       $scope.$watch(function () { return uiFlowManager.getStatus(); },
            function (newStatus){
                if(newStatus) {
                    console.log("Status: "+ newStatus)

                    if(newStatus === "hasManagementRoles") {
                        console.log("HERE");
                        uiFlowManager.cancelValidation();
                        uiFlowManager.invalidateStatus("canAccessList");
                        $state.go("apps.withoutPermission");
                    }else if (newStatus === "canAddApps"){
                        uiFlowManager.invalidateStatus("canAccessList");
                        $state.go("apps.add");
                    }else if (newStatus === "canEditApps"){
                        uiFlowManager.invalidateStatus("canAccessList");
                       $state.go("apps.edit", {id: _id});
                    }

                    var loadApps = listApps(userState.getUserCompanyId())
                        .then(function (apps) {
                            $scope.apps = apps;
                            $scope.loadingComplete = true;
                            toogleMessageAndTable();
                        }, function() {
                            $scope.loadingComplete = true;
                        });

                    $loading.stopSpinnerAfterPromise("rv-dev-hub-apps-loader", loadApps);
                }
            });

        $scope.editApp = function(id) {
            _id = id;
            uiFlowManager.invalidateStatus("canEditApps");
        };

    }]);