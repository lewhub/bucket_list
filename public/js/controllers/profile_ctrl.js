( function(){
    angular.module("bucket_life")
        .controller("ProfileController", ProfileController)

        ProfileController.$inject = ["user_fac", "$stateParams", "item_fac", "$state"];

        function ProfileController(user_fac, $stateParams, item_fac, $state){
            var vm = this;
            vm.title = "profile controller title";
            vm.privileges = false;
            vm.editing = false;
            vm.send_to_api = new Object();
            vm.user_info = function(){
                user_fac.show( $stateParams.id )
                    .then(user_info_res, err_callback)
            }
            vm.user_info();

            vm.view_list = function() {
               $state.go("bucket_list", { id: $stateParams.id } )
            }
            

            vm.new_item = new Object();

            vm.show_item_dropdown = function() {
                vm.adding_item = !vm.adding_item;
                var btn = angular.element(document.querySelector("#add-item"));
                var logout_btn = angular.element(document.querySelector("#logout-btn"));
                var edit_btn = angular.element(document.querySelector("#edit-btn"));
                var edit_info_btn = angular.element(document.querySelector("#edit-info-btn"));
                if (vm.adding_item) {
                    btn.val("Save to Bucket List");
                    logout_btn.attr("disabled", true);
                    edit_btn.attr("disabled", true);
                    edit_info_btn.attr("disabled", true);
                } else {
                    btn.val("Add Bucket List Item");
                    logout_btn.attr("disabled", false);
                    edit_btn.attr("disabled", false);
                    edit_info_btn.attr("disabled", false);

                    vm.new_item.photo = vm.new_photo;
                    console.log(1, vm.new_item);
                    item_fac.create($stateParams.id, vm.new_item)
                        .then(item_create, err_callback)
                }
                // change the text on the adding item button to add/save item.
                // var btn = angular.element(document.querySelector(""))
            }

            function item_create(res) {
                console.log(2, res);
                var filename_p = angular.element(document.querySelector("#filename-p"));
                filename_p.html("");
                vm.new_item = {};
            }
           
            vm.begin_editing = function() {
                var btn = angular.element(document.querySelector("#edit-info-btn"));
                var logout_btn = angular.element(document.querySelector("#logout-btn"));
                var edit_btn = angular.element(document.querySelector("#edit-btn"));
                var add_item_btn = angular.element(document.querySelector("#add-item"));
                vm.original_email = vm.user.email;
                vm.original_bio = vm.user.bio;
                // console.log(1, vm.original_bio)
                var save_text = "Save Changes";
                var edit_text = "Edit Profile Information";
                if (btn.val() === save_text) {
                    // console.log(111, vm.new_photo);
                    vm.original_email = angular.element(document.querySelector("#edit_email")).val();
                    vm.original_bio = angular.element(document.querySelector("#bio-area")).val();
                    if (vm.original_email !== vm.user.email) {
                        // patch email
                        vm.send_to_api.email = vm.original_email;
                    }
                    if (vm.original_bio !== vm.user.bio) {
                        // patch bio
                        vm.send_to_api.bio = vm.original_bio;
                    }
                    if (vm.new_photo) {
                        // patch profile photo
                        vm.send_to_api.profile_photo = vm.new_photo;
                    }
                    console.log(1, vm.send_to_api);
                    user_fac.update( $stateParams.id, vm.send_to_api )
                        .then(update_res , err_callback)
                    
                }

                // console.log(btn.val())
                // var original_email = vm.user.email;
                vm.editing = !vm.editing;
                if (vm.editing) {
                    btn.val(save_text);
                    logout_btn.attr("disabled", true);
                    edit_btn.attr("disabled", true);
                    add_item_btn.attr("disabled", true);
                }
                else {
                    btn.val(edit_text);
                    logout_btn.attr("disabled", false);
                    edit_btn.attr("disabled", false);
                    add_item_btn.attr("disabled", false);
                }
            }


            vm.upload_photo = function() {
                filepicker.setKey("AxGm6Nb8rTPyGLzI0VcuEz");
                var options = { container: "modal", mimetype: "image/*", services: ["COMPUTER"] };
                filepicker.pick( options, photo_upload_res, err_callback );

            }

            function update_res(res) {
                console.log(res);
                vm.user_info();
            }

            function photo_upload_res(res) {
                // make it so it is different when uploading profile picture from bucket list items
                // console.log(1, res.url)
                // console.log(2, res.filename)
                // console.log(3, res)
                vm.new_photo = res.url;
                vm.new_photo_file_name = res.filename;
                vm.show_filename = true;
                var p = angular.element(document.querySelector("#filename-p"));
                p.css("display", "inline");
                console.log(1, p)
                p.html(vm.new_photo_file_name);
                

            }

            function user_info_res(res){
                console.log(129, res);
                var msg = res.data.message;
                // console.log(2111, msg);
                if (msg === "token not found") {
                    user_fac
                        .guest_show({user_id : $stateParams.id})
                        .then(guest_res, err_callback)
                } else {
                    vm.privileges = res.data.privileges;
                    vm.user = res.data.user;
                }
            
                // console.log(1, vm.user.email)
                // console.log(1, vm.user);
            }

            function guest_res(res) {
                console.log(421, res);
                vm.privileges = res.data.privileges;
                vm.user = res.data.user;
            }   
            function err_callback(res) {
                console.log("error");
                console.log(res);
            }


        }
})()