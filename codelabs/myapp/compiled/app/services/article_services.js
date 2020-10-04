"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.findById = findById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPostByUser = getPostByUser;
exports.createPost = createPost;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var _article_model = _interopRequireDefault(require("../models/article_model"));

var _user_model = _interopRequireDefault(require("../models/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAll({
  limit = 50,
  offset = 0
} = {}) {
  return _article_model.default.find({}).exec();
}

function findById(id) {
  return _article_model.default.findById(id).populate('user');
}

function updatePost(postId, post) {
  return _article_model.default.findByIdAndUpdate(postId, post, {
    new: true
  });
}

function deletePost(postId) {
  return _article_model.default.findByIdAndRemove(postId);
}

function getPostByUser(userId, {
  limit = 50,
  offset = 0
} = {}) {
  return _article_model.default.find({
    user: userId
  });
}

async function createPost(post, userId) {
  const newPost = await _article_model.default.create(post);
  const id = newPost._id;
  const user = await _user_model.default.findById(userId);

  if (!user) {
    throw new Error(_error.default.USER_NOT_FOUND);
  }

  let postsArray = [...user.posts] || [];
  postsArray.push(id);
  user.posts = [...postsArray];
  await user.save();
  newPost.user = userId;
  return newPost.save();
}