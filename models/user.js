var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");


var user_schema = Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    bio: { type: String, default: "" },
    profile_photo: { type: String, default: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSS-2Ez5pll3TamIt5o-bzdAWRb4MZeNpLP3oePxA3BNpSu1NjJnT5TMcU" }
})

user_schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

user_schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}



var User = mongoose.model( "User", user_schema);

module.exports = User;