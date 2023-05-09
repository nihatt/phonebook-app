var mongoose = require("mongoose");



var RecordSchema = new mongoose.Schema({
  userid : String,
  text : String,
  phone:String
});


module.exports = mongoose.model("Record",RecordSchema);