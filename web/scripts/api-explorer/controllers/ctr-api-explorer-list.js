/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerListController",
    ["$rootScope", "$scope", "$state", "$log",
        function($rootScope, $scope, $state, $log){
            $scope.sortReverse = false;

            $scope.sortBy = function(category){
                $scope.sortByCat = category;
                $scope.sortReverse = !$scope.sortReverse;
            }

            $scope.methods = [];
            $scope.$watch(function () { return $rootScope.resources; },
                function (resources) {
                    for(var resource in resources){
                        for(var method in resources[resource].methods){
                            $scope.methods.push(resources[resource].methods[method]);
                        }
                    }
                }
            );


            $scope.explore = function(id) {
                $state.go("api-explorer.explore.endpoint", {id: id});
            }
    }]);