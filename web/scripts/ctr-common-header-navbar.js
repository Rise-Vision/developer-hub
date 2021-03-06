angular.module("risevision.developer.hub")
    .controller("CommonHeaderNavbarCtrl", function($rootScope,$scope,$state) {
        $rootScope.navOptions = [{
            title: "App Registration",
            link: $state.href("apps.list")
        },{
            title: "API Explorer",
            link: $state.href("api-explorer.list")
        },{
            title: "Developer Documentation",
            link: "http://help.risevision.com/#/developer",
            target: "_blank"
        }];
    });


