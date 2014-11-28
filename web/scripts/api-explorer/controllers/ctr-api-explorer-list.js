/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerListController",
    ["$scope", "$state", "$log", "getRest",
        function($scope, $state, $log,getRest){

            $scope.explore = function(id) {
                $state.go("api-explorer.explore.endpoint", {id: id});
            }
    }]);