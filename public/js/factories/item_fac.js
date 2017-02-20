( function(){
    angular.module("bucket_life")
        .factory("item_fac", item_fac)

        item_fac.$inject = ["$http"];

        function item_fac($http) {
            var api = "/items/";
            var service = {
                create: create,
                show: show,
                user_index: user_index,
                update: update
            }
            return service

            function create(id, data) {
                return $http.post(api + id, data);
            }
            function show(id) {
                return $http.get(api + id);
            }
            function user_index(id) {
                return $http.get(api + "all/" + id);
            }
            function update(id, data) {
                return $http.patch(api + "update/" + id, data);
            }
        }
})()