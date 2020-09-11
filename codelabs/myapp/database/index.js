var mongoose = require("mongoose");

var mongodb = "mongodb://localhost:27017/my_db";

mongoose.connect(mongodb, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection error"));
