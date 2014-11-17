/**
 * Created by rodrigopavezi on 10/15/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("EditAppController",
    ["$scope", "$state", "$stateParams", "$timeout", "getApp", "updateApp", "deleteApp", "$log", "$loading",  function($scope,$state, $stateParams, $timeout, getApp, updateApp, deleteApp ,$log, $loading){

        var loadApp = getApp($stateParams.id).then(function (app) {
            $scope.app = app;
        });

        $loading.stopSpinnerAfterPromise("rv-dev-hub-app-loader", loadApp);

        $scope.save = function(app) {

            updateApp($stateParams.id,app).then(function(resp){
                $state.go("apps.list");

            }, function(errorResult) {
                $log.debug("Error: " + errorResult.code + " - " + errorResult.message);
            });
        }

        $scope.deleteApp = function(id) {
            deleteApp(id).then(function(result) {
                $state.go("apps.list");
            }, function(errorResult) {
                $log.debug("Error: " + errorResult.code + " - " + errorResult.message);
            });
        };

    }])