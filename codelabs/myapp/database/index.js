var mongoose = require("mongoose");

var mongodb = "mongodb://127.0.0.1:27017/test";

mongoose.connect(mongodb, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection error"));
