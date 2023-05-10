var mongoose = require("mongoose");



var UserSchema = new mongoose.Schema({
  username : String,
  password : String,
  isActive : Boolean
});


module.exports = mongoose.model("User",UserSchema);