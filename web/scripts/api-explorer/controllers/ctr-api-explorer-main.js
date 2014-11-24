/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerMainController",
    ["$rootScope", "$scope", "$state", "$log", "getRest",
        function($rootScope, $scope, $state, $log, getRest){

            var listAppsResult = getRest("core","v0")
                .then(function (api) {
                    $rootScope.resources = api.resources;
                }, function (errorResult) {
                    $log.debug("Error: " + errorResult.code + " - " + errorResult.message);
                });

    }]);