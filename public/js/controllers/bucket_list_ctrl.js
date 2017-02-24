( function(){
    angular.module("bucket_life")
        .controller("BucketListController", BucketListController)

        BucketListController.$inject = ["item_fac", "$stateParams", "user_fac"];

        function BucketListController(item_fac, $stateParams, user_fac) {
            var vm = this;
            vm.title = "Bucket List Ctrl title";
            vm.show_status = false;
            vm.network_load = false;
            vm.privileges = false;
            vm.show_list = function() {
                vm.network_load = true;
                vm.show_status = true;
                item_fac
                    .user_index($stateParams.id)
                    .then(items_index_res, err_callback)
            }
            vm.show_list();

            vm.load_bar = function(item, show) {
                var loading = angular.element(document.getElementById(item._id + "loading-div"));
                
                if (show) {
                      loading.css("display", "block")
                } else {
                    //   loading.css("display", "none")
                }
              
            }

            vm.check_user = function() {
                user_fac
                    .guest_show({user_id: $stateParams.id})
                    .then(user_res, err_callback)
            }
            vm.check_user();

            function user_res(res) {
                console.log(111, res);
                vm.privileges = res.data.privileges;
                vm.user = res.data.user;
            } 

            vm.change_status = function(item) {
               var status = !item.completed;
               vm.load_bar(item, true);
                item_fac
                    .update(item._id, { status: status })
                    .then(status_res, err_callback)
            }

            function status_res(res) {
                console.log(1, res);
                // vm.load_bar(res.data.item, false);
                vm.show_list();
            }

            vm.delete_item = function(item_id) {
                console.log(1, item_id)
                var data = { item_id: item_id };
                var user_id = $stateParams.id;
                vm.network_load = true;
                console.log(data)
                item_fac
                    .remove_item(user_id, data)
                    .then(delete_res, err_callback)
            }
            function delete_res(res) {
                vm.network_load = false;
                console.log(1, res);
                vm.show_list();
            }

            vm.left = function(id) {
                var span = angular.element(document.getElementById(id));
                var icon_span = angular.element(document.getElementById(id + "check-span"));
                var icon = angular.element(document.getElementById(id + "check"));
                var edit = angular.element(document.getElementById(id + "edit"));
                var delete_icon = angular.element(document.getElementById(id + "trash"));
                span.css("opacity", 0);
                icon_span.css("opacity", 0);
                icon.css("opacity", 0);
                edit.css("opacity", 0);
                delete_icon.css("opacity", 0);
            }

            vm.completed = function(id) {
                var span = angular.element(document.getElementById(id));
                var icon_span = angular.element(document.getElementById(id + "check-span"));
                var icon = angular.element(document.getElementById(id + "check"));
                var edit = angular.element(document.getElementById(id + "edit"));
                var delete_icon = angular.element(document.getElementById(id + "trash"));
                span.css("opacity", 1);
                icon_span.css("opacity", 1);
                icon.css("opacity", 1);
                edit.css("opacity", 1);
                delete_icon.css("opacity", 1);
            }
            vm.original_description;
            vm.edited_description;
            vm.enable_edit = function(item) {
                var edit = angular.element(document.getElementById(item._id + "edit"));
                var edit_icon = angular.element(document.getElementById(item._id + "edit_icon"));
                var p_description = angular.element(document.getElementById(item._id + "description"));
                var textarea = angular.element(document.getElementById(item._id + "textarea_div"));
                var label_description = angular.element(document.getElementById(item._id + "label_description"));
                var textarea_description = angular.element(document.getElementById(item._id + "textarea-description"));
                var $textarea = $("#" + item._id + "textarea_div");
                var $p_description = $("#" + item._id + "description");
                if (edit.text() === "Edit") {
                    vm.original_description = item.description;
                    edit.html("Save<i id=" + item._id + "edit_icon" + " class='fa fa-diamond right'></i>");
                    // p_description.css("transition", "height 5s")
                    // p_description.css("height", 0);
      
                    $p_description.animate({
                        opacity: 0
                    }, 600, function(){
                        // console.log(1, "done")
                        p_description.css("display", "none");
                        textarea.css({
                                 display: "block",
                                 height: 0
                             });
                        label_description.css("margin-top", "-20px");
                        $textarea.animate({
                            height: "108px"
                         }, 600, function(){
                             
                            //  console.log(2, "done")
                         })
                    })
                    
                    
                } else {
                    
                    vm.edited_description = textarea_description.val().trim();
      
                    if (vm.edited_description !== vm.original_description) {
                    
                        console.log(1, vm.edited_description);
                        console.log(2, vm.original_description);
                        vm.load_bar(item, true)
                        item_fac
                            .update(item._id, { description: vm.edited_description })
                            .then(description_res, err_callback)
                       
                    } else {
                        console.log(3, vm.edited_description);
                        console.log(4, vm.original_description);
                    }
                    edit.html("Edit<i id=" + item._id + "edit_icon" + " class='fa fa-pencil-square-o right'></i>");
                    
                    $textarea.animate({
                        height: "22px",
                        opacity: 0
                    }, 600, function(){
                        textarea.css("opacity", 1);
                        textarea.css("display", "none");
                        p_description.css({
                            display: "block",
                            opacity: 0
                        })
                        p_description.animate({
                            opacity: 1
                        }, 600, function(){
                            // console.log("done");
                        })
                    })
                    
        
                }


            }

            function description_res(res) {
                vm.load_bar(res.data.item, false);
                console.log(1, res);
                vm.original_description = "";
                vm.edited_description = "";
                vm.show_list();

            }

            vm.change_label_style = function(item) {
                var label_description = angular.element(document.getElementById(item._id + "label_description"));
                label_description.css("margin-top", 0);
            }
            
            function items_index_res(res) {
                vm.network_load = false;
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