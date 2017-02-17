( function(){
    angular.module("bucket_life")
        .controller("ProfileController", ProfileController)

        ProfileController.$inject = ["user_fac", "$stateParams"];

        function ProfileController(user_fac, $stateParams){
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

            vm.show_item_dropdown = function() {
                vm.adding_item = !vm.adding_item;
                // change the text on the adding item button to add/save item.
                // var btn = angular.element(document.querySelector(""))
            }
           
            vm.begin_editing = function() {
                var btn = angular.element(document.querySelector("#edit-info-btn"));
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
                if (vm.editing) 
                    btn.val(save_text);
                else
                    btn.val(edit_text);
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
                // console.log(1, res.url)
                // console.log(2, res.filename)
                // console.log(3, res)
                vm.new_photo = res.url;

            }

            function user_info_res(res){
                // console.log(res);
                vm.privileges = res.data.privileges;
                vm.user = res.data.user;
                // console.log(1, vm.user.email)
                // console.log(1, vm.user);
            }   
            function err_callback(res) {
                console.log("error");
                console.log(res);
            }


        }
})()