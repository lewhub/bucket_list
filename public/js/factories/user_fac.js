( function(){
    angular.module("bucket_life")
        .factory("user_fac", user_fac)

        user_fac.$inject = ["$http"];

        function user_fac($http) {
            var api = "/users/";
            
            var service = {
                index: index,
                show: show,
                guest_show: guest_show,
                create: create,
                update: update,
                remove_user: remove_user,
                login: login,
                login_introduction: login_introduction
            }

            return service;

            function index() {
                return $http.get(api);
            }
            function show( id ) {
                return $http.get(api + id);
            }
            function guest_show(data) {
                return $http.post(api + "guest-access/", data);
            }
            function create(data) {
                return $http.post(api, data);
            }
            function update(id, data) {
                return $http.patch(api + id, data);
            }
            function remove_user(id) {
                return $http.delete(api + id);
            }
            function login(data) {
                return $http.post(api + "login", data);
            }
            function login_introduction(data) {
                return $http.post(api + "login-introduction", data);
            }
        }
})()