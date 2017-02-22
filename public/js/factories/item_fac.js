( function(){
    angular.module("bucket_life")
        .factory("item_fac", item_fac)

        item_fac.$inject = ["$http"];

        function item_fac($http) {
            var api = "/items/";
            var service = {
                index: index,
                create: create,
                show: show,
                user_index: user_index,
                update: update,
                remove_item: remove_item
            }
            return service

            function index() {
                return $http.get(api);
            }
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
            function remove_item(id, data) {
                console.log(2, data);
                return $http.post(api + "delete/" + id, data);
            }
        }
})()