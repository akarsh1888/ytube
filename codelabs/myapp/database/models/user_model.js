var mongoose = require("mongoose");

// Define Schema
var UserModelSchema = new mongoose.Schema({
  username: String,
  email: String,
  host: String,
});

module.exports = mongoose.model("User", UserModelSchema);
