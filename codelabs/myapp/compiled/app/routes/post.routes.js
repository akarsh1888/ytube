"use strict";

var _article_validator = _interopRequireDefault(require("../validators/article_validator"));

var _post = _interopRequireDefault(require("../controllers/post.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();
router.route('/').get(_post.default.listAll).post(_post.default.create);
router.route('/:postId').put([_article_validator.default.uuidValidator, _post.default.put]).delete([_article_validator.default.uuidValidator, _post.default.delete]);
router.route('/get_by_title').get([_post.default.getPostByTitle]);
router.route('/get_by_contentlength').get([_post.default.getPostByContentLength]);
router.route('/get_totalPostCount').get(_post.default.getTotalPostCountByUser);
module.exports = router;