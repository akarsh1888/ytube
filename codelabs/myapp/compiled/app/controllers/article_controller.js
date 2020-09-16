"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var articleService = _interopRequireWildcard(require("../services/article_services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const operations = {
  // get all artticles
  list: async (req, res, next) => {
    try {
      const data = await articleService.findAll();
      res.status(200).json(data);
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // it will pass to the next middleware which we registered after all routes on the base page
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // get one article
  get: async (req, res, next) => {
    const postId = req.params.articleId;

    try {
      const data = await articleService.findById(postId);
      res.status(200).json(data);
    } catch (err) {
      // next(err);  u can choose either this OR below for error handling
      // error handling 1>>> custom middleware 2>>>> normal error response
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // update one article
  put: async (req, res, next) => {
    const postId = req.params.articleId;
    const post = req.body;

    try {
      const data = await articleService.updatePost(postId, post);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  delete: async (req, res) => {
    const {
      articleId
    } = req.params;
    console.log('HI', articleId);

    try {
      const data = await articleService.deletePost(articleId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // get a post by a user
  // /api/users/:userid/articles  GET
  getPostByUser: async (req, res, next) => {
    const {
      userId
    } = req.params;

    try {
      const data = await articleService.getPostByUser(userId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  // create a post by a user
  // /api/users/:userid/articles  POST
  create: async (req, res, next) => {
    try {
      const post = req.body;
      const {
        userId
      } = req.params;
      const data = await articleService.createPost(post, userId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  }
};
var _default = operations;
exports.default = _default;