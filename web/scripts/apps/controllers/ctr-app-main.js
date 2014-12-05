/**
 * Created by rodrigopavezi on 10/22/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .controller("MainAppController",
    ["$rootScope", "$http" ,function($rootScope,$http) {

        $http.get('data/metatags.json').success (function(data) {
            $rootScope.metatag = data["developer"];
        });
    }]);