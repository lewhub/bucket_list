( function(){
    angular.module("bucket_life")
        .controller("UserController", UserController)

        UserController.$inject = ["user_fac", "$state", "$stateParams"];

        function UserController(user_fac, $state, $stateParams) {
            var vm = this;
            vm.title = "user ctrl title";

            
            // ====== Top Level Variables =====

            vm.signup_info = new Object();
            vm.login_info = new Object();
            vm.show_flash_message = false;

            // ====== Top Level Functions ======

            vm.signup = function() {
                // console.log(vm.signup_info);
                var reg = new RegExp(" ");
                if (reg.test(vm.signup_info.password) || reg.test(vm.signup_info.confirm_password)) {
                    vm.show_flash_message = true;
                    vm.signup_info = {};
                    vm.flash_message = "Please make sure to not include any spaces or whitespace in your new password."
                } else if (vm.signup_info.email === undefined) {
                    vm.show_flash_message = true;
                    vm.signup_info = {};
                    vm.signup_info.email = "";
                    vm.flash_message = "Please enter in your email address and re-submit the form.";
                } else if (vm.signup_info.password === undefined) {
                    vm.show_flash_message = true;
                    vm.flash_message = "Please create a password and re-submit the form.";
                } else if (vm.signup_info.confirm_password === undefined) {
                    vm.show_flash_message = true;
                    vm.flash_message = "Please re-enter your new password in the confirm password field and re-submit the form.";
                } else {
                    user_fac
                        .create(vm.signup_info)
                        .then(signup_res, err_callback)
                } 
            }

            vm.login = function() {
                console.log(vm.login_info);
                user_fac
                    .login(vm.login_info)
                    .then(login_res, err_callback)
            }

            vm.toggleFlash = function() {
                vm.show_flash_message = !vm.show_flash_message; 
            }

            // ========= Anonoymous Functions ==========

            function err_callback(res) {
                console.log("error response:");
                console.log(res);
            }

            function signup_res(res) {
                console.log(res);
                if (res.data.success) {
                    $state.go("profile", { id: res.data.user._id });
                } else {
                    vm.signup_info = {};
                    vm.show_flash_message = true;
                    if (res.data.message === "Email already registered.") {
                        vm.flash_message = "Account with email provided already exist. Please use another email or login.";
                    } else if (res.data.message === "Passwords do not match.") {
                        vm.flash_message = "Please make sure both passwords match and re-submit the form."
                    } 
                }
            }

            function login_res(res) {
                console.log(res);
                if (res.data.success) {
                    $state.go("profile", { id: res.data.user._id });
                } else {
                    vm.show_flash_message = true;
                    if (res.data.message === "Account with email provided does not exist.") {
                        vm.login_info = {};
                        vm.login_info.email = "";
                        vm.flash_message = "Account with email provided does not exist.";
                    } else if (res.data.message === "Incorrect Password") {
                        vm.login_info.password = "";
                        vm.flash_message = "Password is incorrect."
                    }
                }
            }
            
        }
})()