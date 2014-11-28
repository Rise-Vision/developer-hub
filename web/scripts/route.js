/**
 * Created by rodrigopavezi on 10/17/14.
 */

"use strict";
angular.module("risevision.developer.hub")
    .config (["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/apps/list");

        $stateProvider
            .state('apps', {
                template: "<div ui-view></div>",
                abstract: true
            })
            .state('apps.withoutPermission', {
                url: '/apps/userWithoutPermission',
                templateUrl: 'partials/apps/apps.withoutPermission.html'
            })
            .state('apps.list', {
                url: '/apps/list',
                templateUrl: 'partials/apps/apps.list.html',
                controller: 'AppManagementController'
            })
            .state('apps.add', {
                url: '/apps/add',
                templateUrl: 'partials/apps/app-form.html',
                controller: 'AddAppController'
            })
            .state('apps.edit', {
                url: '/apps/edit/:id',
                templateUrl: 'partials/apps/app-edit.html',
                controller: 'EditAppController'
            })
    }]);