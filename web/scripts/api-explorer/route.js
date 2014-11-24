/**
 * Created by rodrigopavezi on 10/17/14.
 */

"use strict";
angular.module("risevision.developer.hub")
    .config (["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/api-explorer/list");

        $stateProvider
            .state('api-explorer', {
                templateUrl: "partials/api-explorer/api-explorer.html",
                controller: 'ApiExplorerMainController'
            })
            .state("api-explorer.list", {
                url: '/api-explorer/list',
                templateUrl: 'partials/api-explorer/api-explorer.list.html',
                controller: 'ApiExplorerListController'
            })
            .state('api-explorer.explore', {
                url: '/api-explorer/:id',
                templateUrl: function(params){ return "partials/api-explorer/" + params.id + ".html"; },
                controller: 'ApiExplorerExploreController'
            })
    }]);