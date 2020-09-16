"use strict";

var _article_validator = _interopRequireDefault(require("../validators/article_validator"));

var _article_controller = _interopRequireDefault(require("../controllers/article_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();
router.route('/').get(_article_controller.default.list);
router.route('/:articleId').get([_article_validator.default.uuidValidator, _article_controller.default.get]).put([_article_validator.default.uuidValidator, _article_controller.default.put]).delete([_article_validator.default.uuidValidator, _article_controller.default.delete]);
module.exports = router;