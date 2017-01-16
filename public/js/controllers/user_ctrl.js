( function(){
    angular.module("bucket_life")
        .controller("UserController", UserController)

        function UserController() {
            var vm = this;
            vm.title = "user ctrl title";
        }
})()