angular.module("risevision.developer.hub")
    .controller("CommonHeaderNavbarCtrl", function($rootScope,$scope,$state) {
        $rootScope.navOptions = [{
            title: "App Registration",
            link: $state.href("apps.list")
        },{
            title: "Developer Documentation",
            link: "http://help.risevision.com/#/developer",
            target: "_blank"
        }, {
            title: "GitHub Open Source",
            link: "https://github.com/Rise-Vision",
            target: "_blank"
        },{
            title: "Community",
            link: "http://community.risevision.com",
            target: "_blank"
        }];
    });


