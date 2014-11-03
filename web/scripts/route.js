/**
 * Created by rodrigopavezi on 10/17/14.
 */

"use strict";
angular.module("risevision.developer.hub")
    .config (["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('apps', {
                template: "<div ui-view></div>",
                abstract: true
            })
            .state('apps.main', {
                url: '/apps',
                templateUrl: 'partials/apps/apps.html',
                controller: 'MainAppController'
            })
            .state('apps.userSignin', {
                url: '/userSignin',
                templateUrl: 'partials/apps/apps.userSignin.html',
                controller: 'MainAppController'
            })
            .state('apps.withoutPermission', {
                url: '/userSignin',
                templateUrl: 'partials/apps/apps.withoutPermission.html'
            })
            .state('apps.list', {
                url: '/list',
                templateUrl: 'partials/apps/apps.list.html',
                controller: 'AppManagementController'
            })
            .state('apps.add', {
                url: '/add',
                templateUrl: 'partials/apps/app-form.html',
                controller: 'AddAppController'
            })
            .state('apps.edit', {
                url: '/edit/:id',
                templateUrl: 'partials/apps/app-edit.html',
                controller: 'EditAppController'
            })
    }]);