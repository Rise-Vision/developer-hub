angular.module("risevision.developer.hub")
    .controller("CommonHeaderNavbarCtrl", function($rootScope,$scope,$state) {
        $rootScope.navOptions = [{
            title: "Apps",
            link: $state.href("apps.main")
        },{
            title: "Style Guide",
            link: "http://rise-vision.github.io/style-guide/",
            target: "_blank"
        }, {
            title: "Api Explorer",
            link: "http://rise-vision.github.io/core-api/",
            target: "_blank"
        },{
            title: "Documentation",
            link: "http://documentation.risevision.com/developer",
            target: "_blank"
        }];
    });


