( function(){
    angular.module("bucket_life")
        .config( function($stateProvider, $urlRouterProvider){
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
                    url: "/login",
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