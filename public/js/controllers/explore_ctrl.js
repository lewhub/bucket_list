( function(){
    angular.module("bucket_life")
        .controller("ExploreController", ExploreController)

        ExploreController.$inject = ["item_fac", "user_fac"];

        function ExploreController(item_fac, user_fac) {
            var vm = this;
            vm.title = "Explore Ctrl title";
            vm.show_completed_item_list = true;
            vm.show_in_progress_item_list = false;
             vm.update_list = function() {
                item_fac
                    .index_of_status()
                    .then(status_res, err_callback)
            }
            vm.update_list();

            vm.icon_fix = function(){
                var label_icon = angular.element(document.querySelector(".label-icon"));
                label_icon.removeClass("active");
            }

             vm.email_calc = function(user_id) {
                 return "hello"
                // user_fac
                //     .show(user_id)
                //     .then(email_res, err_callback)
            }

            vm.nav_toggle = function(evt) {
                var el = angular.element(evt.target);
                
                var active = el.hasClass("active");
                var id = el.attr("id");
                var com = angular.element(document.getElementById("not-in-progress"));
                var progress = angular.element(document.getElementById("in-progress"));
                if (!active && id === "in-progress") {
                    vm.show_in_progress_item_list = true;
                    vm.show_completed_item_list = false;
                    vm.update_list();
                    com.removeClass("active");
                    el.addClass("active");
                } else if (!active && id === "not-in-progress") {
                    vm.show_completed_item_list = true;
                    vm.show_in_progress_item_list = false;
                    vm.update_list();
                    progress.removeClass("active");
                    el.addClass("active");
                }
            }

           

            vm.choose_list = function() {
                if (vm.show_completed_item_list) {
                    return vm.completed_item_list;
                } else if (vm.show_in_progress_item_list) {
                    return vm.in_progress_item_list;
                }
            }

            function status_res(res) {
                console.log(1, res);
                vm.in_progress_item_list = res.data.in_progress_list;
                vm.completed_item_list = res.data.completed_list;
            }

            function email_res(res) {
                console.log(1, res);
                return "hello";
            }

            function items_res(res) {
                console.log(1, res.data);
                vm.items = res.data.items;
            }

            function err_callback(res) {
                console.log("error");
                console.log(res);
            }
        }
})()