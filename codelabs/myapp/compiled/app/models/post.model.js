"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var mongoose = require('mongoose'); // small letter for schema definition


var postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 1200
  },
  contentLength: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: `active`
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Profile'
  },
  similarPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
}); // postSchema.createIndex({ title: 'text' })
// capital letter for a model

var _default = mongoose.model('Post', postSchema);

exports.default = _default;