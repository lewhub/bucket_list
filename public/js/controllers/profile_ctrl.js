( function(){
    angular.module("bucket_life")
        .controller("ProfileController", ProfileController)

        function ProfileController(){
            var vm = this;
            vm.title = "profile controller title";
        }
})()