( function(){
    angular.module("bucket_life")
        .config( function($stateProvider, $urlRouterProvider, $httpProvider){
            $httpProvider.interceptors.push( function($window){
                return {
                    "request": function(config) {
                        var token = $window.localStorage["jwt-token"];
                        if (token) {
                            config.headers["x-access-token"] = token;
                        }
                        return config;
                    },
                    "response": function(response) {
                        if (response.data.token) {
                            $window.localStorage["jwt-token"] = response.data.token;
                        }
                        return response;
                    }
                }
            })
            $urlRouterProvider.otherwise("/introduction")

            $stateProvider
                .state("introduction", {
                    url: "/introduction",
                    templateUrl: "/partials/introduction.html"
                })
                .state("signup", {
                    url: "/signup",
                    templateUrl: "/partials/signup.html",
                    controller: "UserController as user_ctrl"
                })
                .state("login", {
                    url: "/login/:flash_message",
                    templateUrl: "/partials/login.html",
                    controller: "UserController as user_ctrl"
                })
                .state("profile", {
                    url: "/profile/:id",
                    templateUrl: "/partials/profile.html",
                    controller: "ProfileController as profile_ctrl"
                })
        })
})()