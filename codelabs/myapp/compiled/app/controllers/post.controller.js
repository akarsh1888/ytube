"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var postService = _interopRequireWildcard(require("../services/post.services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const postCtrl = {
  create: async (req, res, next) => {
    try {
      const post = req.body.post;
      const {
        id
      } = req.user;
      const data = await postService.createPost(post, id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // get all artticles
  listAll: async (req, res, next) => {
    try {
      const {
        id
      } = req.user;
      const data = await postService.listAll(id);
      res.status(200).json(data);
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // it will pass to the next middleware which we registered after all routes on the base page
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // update one article
  put: async (req, res, next) => {
    const postId = req.params.postId;
    const {
      article
    } = req.body;

    try {
      const data = await postService.updatePost(postId, article);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  delete: async (req, res) => {
    const {
      postId
    } = req.params;

    try {
      const data = await postService.deletePost(postId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  getPostByTitle: async (req, res, next) => {
    const {
      keyword
    } = req.query;

    try {
      const data = await postService.getPostByTitle(keyword);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  getPostByContentLength: async (req, res, next) => {
    const {
      min,
      max
    } = req.query;

    try {
      const data = await postService.getPostByContentLength(min, max);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  getTotalPostCountByUser: async (req, res, next) => {
    try {
      const {
        id
      } = req.user;
      const data = await postService.getTotalPostCountByUser(id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  }
};
var _default = postCtrl;
exports.default = _default;