( function(){
    angular.module("bucket_life")
        .controller("GlobalController", GlobalController)

        GlobalController.$inject = ["$window", "$rootScope", "$state"];

        function GlobalController($window, $rootScope, $state) {
            var vm = this;
            vm.title = "global ctrl title";

            vm.parse_jwt = function(token) {
                var base64Url = token.split(".")[1];
                var base64 = base64Url.replace("-", "+").replace("_", "/");
                return JSON.parse($window.atob(base64));
            }
            vm.is_authed = function(){
                var token = $window.localStorage["jwt-token"];
                if (token) {
                    var params = vm.parse_jwt(token);
                    return Math.round( new Date().getTime() / 1000 <= params.exp );
                } else {
                    return false;
                }
            }

            vm.logout = function(){
                $window.localStorage.removeItem("jwt-token");
            }

        }
})()