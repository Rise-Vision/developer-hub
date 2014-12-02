/**
 * Created by rodrigopavezi on 11/20/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("ApiExplorerListController",
    ["$rootScope", "$scope", "$state", "$log", "$http",
        function($rootScope, $scope, $state, $log,$http){
            $scope.sortReverse = false;

            $scope.sortBy = function(category){
                $scope.sortByCat = category;
                $scope.sortReverse = !$scope.sortReverse;
            }

            $http.get('data/descriptions.json').success (function(data) {
                $scope.descriptions = data;
            });

            $scope.methods = [];
            $scope.$watch(function () { return $rootScope.resources; },
                function (resources) {
                    $scope.$watch(function () { return $scope.descriptions; },
                        function (descriptions) {
                            for(var resourceKey in resources){
                                for(var methodKey in resources[resourceKey].methods){
                                    var method = resources[resourceKey].methods[methodKey];
                                    method.description = descriptions[method.id];
                                    $scope.methods.push(method);
                                }
                            }
                        }
                    );
                }
            );


            $scope.explore = function(id) {
                $state.go("api-explorer.explore.endpoint", {id: id});
            }
    }]);