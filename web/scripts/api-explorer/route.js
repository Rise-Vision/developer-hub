/**
 * Created by rodrigopavezi on 10/17/14.
 */

"use strict";
angular.module("risevision.developer.hub")
    .config (["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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
                templateUrl: "partials/api-explorer/api-explorer-explore.html"
            })
            .state('api-explorer.explore.endpoint', {
                url: '/api-explorer/:id',
                templateUrl: "partials/api-explorer/api-explorer-explore-endpoint.html",
                controller: 'ApiExplorerExploreEndpointController'
            })
    }]);