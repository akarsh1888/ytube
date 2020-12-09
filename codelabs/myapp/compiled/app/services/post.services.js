"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.listAll = listAll;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPostByTitle = getPostByTitle;
exports.getPostByContentLength = getPostByContentLength;
exports.getTotalPostCountByUser = getTotalPostCountByUser;

var _auth = _interopRequireDefault(require("../models/auth.model"));

var _post = _interopRequireDefault(require("../models/post.model"));

var _profile = _interopRequireDefault(require("../models/profile.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function createPost(post, userId) {
  const {
    profile
  } = await _auth.default.findById(userId);
  const newPost = await _post.default.create(_objectSpread(_objectSpread({}, post), {}, {
    profile: profile
  }));
  const id = newPost._id;
  const w = await _profile.default.findByIdAndUpdate(profile, {
    $push: {
      posts: id
    }
  }, {
    new: true
  }).exec();
  return newPost; // const user = await User.findById(userId)
  // if (!user) {
  //   throw new Error(errorMessages.USER_NOT_FOUND)
  // }
  // let postsArray = [...user.posts] || []
  // postsArray.push(id)
  // user.posts = [...postsArray]
  // await user.save()
  // newPost.user = userId
  // return newPost.save()
}

async function listAll(id) {
  const {
    profile
  } = await _auth.default.findById(id);
  return _post.default.find({
    profile: profile
  }).exec();
}

function updatePost(postId, post) {
  return _post.default.findByIdAndUpdate(postId, post, {
    new: true
  }).exec();
}

async function deletePost(postId) {
  const post = await _post.default.findByIdAndRemove(postId);
  const w = await _profile.default.findByIdAndUpdate(post.profile, {
    $pull: {
      posts: postId
    }
  }, {
    new: true
  }).exec();
  return post;
}

function getPostByTitle(keyword) {
  return _post.default.find({
    title: {
      $regex: keyword,
      $options: 'i'
    }
  });
}

function getPostByContentLength(min, max) {
  return _post.default.find({
    contentLength: {
      $gt: min,
      $lt: max // $or :[9,15,25]

    }
  });
}

async function getTotalPostCountByUser(id) {
  const {
    profile
  } = await _auth.default.findById(id);
  const info = await _profile.default.findById(profile);
  return info.totalPostCount;
}