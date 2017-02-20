( function(){
    angular.module("bucket_life")
        .controller("BucketListController", BucketListController)

        BucketListController.$inject = ["item_fac", "$stateParams"];

        function BucketListController(item_fac, $stateParams) {
            var vm = this;
            vm.title = "Bucket List Ctrl title";
            vm.show_status = false;
            vm.show_list = function() {
                item_fac
                    .user_index($stateParams.id)
                    .then(items_index_res, err_callback)
            }
            vm.show_list();

            vm.change_status = function(item) {
                var status = !item.completed;
                item_fac
                    .update(item._id, { status: status })
                    .then(status_res, err_callback)
            }

            function status_res(res) {
                console.log(1, res);
                vm.show_list();
            }

            vm.left = function(id) {
                var span = angular.element(document.getElementById(id));
                var icon_span = angular.element(document.getElementById(id + "check-span"));
                var icon = angular.element(document.getElementById(id + "check"));
                span.css("opacity", 0);
                icon_span.css("opacity", 0);
                icon.css("opacity", 0);
            }

            vm.completed = function(id) {
                var span = angular.element(document.getElementById(id));
                var icon_span = angular.element(document.getElementById(id + "check-span"));
                var icon = angular.element(document.getElementById(id + "check"));
                span.css("opacity", 1);
                icon_span.css("opacity", 1);
                icon.css("opacity", 1);

            }
            
            function items_index_res(res) {
                console.log(res.data.items)
                vm.items = res.data.items;
                
            }
            function err_callback(res) {
                console.log(454, "error");
                console.log(res);
            }

            vm.status_calc = function(val) {
                if (val) {
                   return "Completed!"; 
                } else {
                    return "Not Completed Yet."
                }
            }

            vm.icon_decision = function(val) {
                if (val) {
                    return "fa fa-times x-check";
                } else {
                    return "fa fa-check";
                }
            }
            vm.icon_a_decision = function(val) {
                if (val) {
                    return "btn-floating halfway-fab waves-effect waves-light red check-c";
                } else {
                    return "btn-floating halfway-fab waves-effect waves-light green check-c";
                }
            }

            vm.check_icon_status = function(val) {
                if (val) {
                    return "Mark item as not yet completed";
                } else {
                    return "Mark item as completed";
                }
            }

        }


})()

// el.text is equal to item.completed
// if item.
/*
 if item.completed 
 vm.status = "Completed!"
 else 
 vm.status = "Not Completed Yet."


*/