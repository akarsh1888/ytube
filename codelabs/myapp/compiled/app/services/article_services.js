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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArticleModel = require('../database/models/article_model');

const UserModel = require('../database/models/user_model');

function findAll({
  limit = 50,
  offset = 0
} = {}) {
  return ArticleModel.find({});
}

function findById(id) {
  return ArticleModel.findById(id).populate('user');
}

function updatePost(postId, post) {
  return ArticleModel.findByIdAndUpdate(postId, post, {
    new: true
  });
}

function deletePost(postId) {
  return ArticleModel.findByIdAndRemove(postId);
}

function getPostByUser(userId, {
  limit = 50,
  offset = 0
} = {}) {
  return ArticleModel.find({
    user: userId
  });
}

async function createPost(post, userId) {
  const newPost = await ArticleModel.create(post);
  const id = newPost._id;
  const user = await UserModel.findById(userId);

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