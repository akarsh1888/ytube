var mongoose = require("mongoose");

// Define Schema
var CartModelSchema = new mongoose.Schema({
  name: String,
  category: String,
  amount: Number,
});

module.exports = mongoose.model("Cart", CartModelSchema);
