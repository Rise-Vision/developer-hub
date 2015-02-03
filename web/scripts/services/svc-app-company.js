/**
 * Created by rodrigopavezi on 11/25/14.
 */
"use strict";
angular.module("risevision.developer.hub")
    .factory("appCompany", ["$q","DevHubCache","getCompany", function($q, DevHubCache,getCompany) {
        return function(app) {
            var deferred = $q.defer();
            var companyFromCache = DevHubCache.get("company-"+app.companyId);
            if(!companyFromCache) {
                return getCompany(app.companyId)
                    .then(function (company) {
                        app.company = company;
                        DevHubCache.put("company-"+app.companyId,company);

                        deferred.resolve(true);
                    }, function (errorResult) {
                        $log.debug("Error: " + errorResult);
                        deferred.reject(errorResult);
                    });
            }else{
                app.company = companyFromCache;
                deferred.resolve(true);
            }

            return deferred.promise;
        }
    }]);