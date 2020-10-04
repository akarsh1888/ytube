"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = require('mongoose'); // small letter for schema definition


var article = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  status: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'user'
  }
}); // capital letter for a model

const Article = mongoose.model('article', article);
var _default = Article;
exports.default = _default;