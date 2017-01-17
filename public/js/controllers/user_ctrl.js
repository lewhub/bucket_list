( function(){
    angular.module("bucket_life")
        .controller("UserController", UserController)

        UserController.$inject = ["user_fac"];

        function UserController(user_fac) {
            var vm = this;
            vm.title = "user ctrl title";

            function err_callback(res) {
                console.log("error response:");
                console.log(res);
            }

            vm.signup_info = new Object();

            vm.signup = function() {
                console.log(vm.signup_info);
                user_fac
                    .create(vm.signup_info)
                    .then(signup_res, err_callback)
            }

            function signup_res(res) {
                console.log(res);
            }
            
        }
})()