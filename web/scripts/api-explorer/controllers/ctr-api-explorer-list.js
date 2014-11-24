/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerListController",
    ["$scope", "$state", "$log", "getRest",
        function($scope, $state, $log,getRest){

            $scope.documentationUrl = "http://help.risevision.com/#/developer/core-api/"

            $scope.explore = function(id) {
                $state.go("api-explorer.explore", {id: id});
            }
    }]);