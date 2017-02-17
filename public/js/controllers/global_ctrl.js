( function(){
    angular.module("bucket_life")
        .controller("GlobalController", GlobalController)

        GlobalController.$inject = ["$window", "$rootScope", "$state"];

        function GlobalController($window, $rootScope, $state) {
            var vm = this;
            vm.title = "global ctrl title";
            vm.session_expired = true;

            vm.parse_jwt = function(token) {
                var base64Url = token.split(".")[1];
                var base64 = base64Url.replace("-", "+").replace("_", "/");
                return JSON.parse($window.atob(base64));
            }
            vm.is_authed = function(){
                // console.log("is_authed method fired!")
                var token = $window.localStorage["jwt-token"];
                if (token) {
                    var params = vm.parse_jwt(token);
                    // console.log(1,params)
                    // console.log(2, Math.round(new Date().getTime() / 1000) <= params.exp)
                    return Math.round(new Date().getTime() / 1000) <= params.exp;
                } else {
                    return false;
                }
            }

            vm.logout = function(){
                $window.localStorage.removeItem("jwt-token");
                $state.go("introduction");
            }

            

            $rootScope.$on("$stateChangeStart", function(event, toState) {
                var curr_state = toState.name;
                if (curr_state === "introduction" && vm.is_authed() > 0) {
                    vm.session_expired = false;
                } else if (curr_state === "introduction" && (!vm.is_authed() || vm.is_authed() === 0)) {
                    vm.session_expired = true;
                }
                if (curr_state === "profile") {
                    if (!vm.is_authed() || vm.is_authed() === 0) {
                        event.preventDefault();
                        $state.go("login");
                    }
                }
            });

        }
})()