"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("./express");

/**
 * Module dependencies.
 */
require('dotenv').config();

const http = require('http');

var logger = require('winston');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */


var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // Bootstrap sequelize models

const server = http.createServer((0, _express.start)());
server.listen(5000 || process.env.PORT, () => {
  logger.info('Application started on port ', 5000 || process.env.PORT);
});
var _default = server;
exports.default = _default;