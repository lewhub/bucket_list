( function(){
    angular.module("bucket_life")
        .controller("ExploreController", ExploreController)

        ExploreController.$inject = ["item_fac", "user_fac"];

        function ExploreController(item_fac, user_fac) {
            var vm = this;
            vm.title = "Explore Ctrl title";

            vm.show_items = function() {
                item_fac
                    .index()
                    .then(items_res, err_callback)
            }
            vm.show_items();

             vm.email_calc = function(user_id) {
                 return "hello"
                // user_fac
                //     .show(user_id)
                //     .then(email_res, err_callback)
            }

            vm.nav_toggle = function(evt) {
                var el = angular.element(evt.target);
                
                var active = el.parent().hasClass("active");
                var id = el.parent().attr("id");
                var com = angular.element(document.getElementById("not-in-progress"));
                var progress = angular.element(document.getElementById("in-progress"));
                if (!active && id === "in-progress") {
        
                    com.removeClass("active");
                    el.parent().addClass("active");
                } else if (!active && id === "not-in-progress") {
                    
                    progress.removeClass("active");
                    el.parent().addClass("active");
                }
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