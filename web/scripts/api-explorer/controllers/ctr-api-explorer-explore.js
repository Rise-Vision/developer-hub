/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerExploreController",
    ["$rootScope", "$scope", "$state", "$stateParams", "$log", "getRest",
        function($rootScope, $scope, $state, $stateParams, $log, getRest){

            $scope.title = $stateParams.id;

            // Splits the id so we can take the resource and the method from it e.g core.company.get
            // idParts[0] = core
            // idParts[1] = company
            // idPatrs[2] = get
            var idParts = $stateParams.id.split(".");

            $scope.$watch(function () { return $rootScope.resources; },
                function (resources) {
                    $scope.parameters = $rootScope.resources[idParts[1]].methods[idParts[2]].parameters
                }
            );

    }]);