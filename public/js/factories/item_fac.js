( function(){
    angular.module("bucket_life")
        .factory("item_fac", item_fac)

        item_fac.$inject = ["$http"];

        function item_fac($http) {
            var api = "/items/";
            var service = {
                create: create
            }
            return service

            function create(id, data) {
                return $http.post(api + id, data);
            }
        }
})()