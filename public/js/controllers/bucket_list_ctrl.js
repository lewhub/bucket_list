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

            vm.left = function(evt) {
            //    var el = angular.element(evt.target.children[0])

            //     if (el.length > 0) {
            //         if (angular.element(evt.target.children[0].children).length > 0) {
            //             el = angular.element(evt.target.children[0].children[0].children[0].children[1]);
            //             el.css("opacity", 0);
            //         }
            //     }
            }

            vm.completed = function(evt) {
      
                var el = angular.element(evt.target.children[0])
             
                if (el.length > 0) {
                    
                    if (angular.element(evt.target.children[0].children).length > 0) {
                        el = angular.element(evt.target.children[0].children[0].children[0].children[1]);
                        // el.addClass("show-animation")
                        el.css({});
                        // el.css("opacity", 1);
                        // el.animate({
                        //     opacity: 1
                        //  }, {
                        //      duration: 1000,
                        //      done: function() {
                        //          console.log("animation done");
                        //          el.css({opacity: 0})
                        //      }
                        //  })
                        // if (status) {
                        //     el.text("Completed!");
                        // } else {
                        //     el.text("Not Completed Yet.");
                        // }
                    }    
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

            vm.status_calc = function(val) {
                if (val) {
                   return "Completed!"; 
                } else {
                    return "Not Completed Yet."
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