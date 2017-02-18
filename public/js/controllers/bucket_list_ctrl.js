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

            vm.toggle_status = function() {
                vm.show_status = !vm.show_status;
            }

            vm.completed = function(item_index, item_id, evt) {
                console.log(1, evt);
                var f_id = vm.items[item_index]._id;

                if (f_id === item_id) {
                    vm.show_status = true;
                }
               
               

            }
            
            function items_index_res(res) {
                console.log(res.data.items)
                vm.items = res.data.items;
                
            }
            function err_callback(res) {
                console.log(454, "error");
                console.log(res);
            }
        }
})()