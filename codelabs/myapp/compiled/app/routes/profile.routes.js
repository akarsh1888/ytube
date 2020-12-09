"use strict";

var _article_validator = _interopRequireDefault(require("../validators/article_validator"));

var _profile = _interopRequireDefault(require("../controllers/profile.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();
router.route('/').get(_profile.default.get).put(_profile.default.put);
/**
 *
 * here below, we r running a array of middlewares ie. input Validation
 * before going to controllers for evaluating response
 * these middlewares r specific to these request only ,registered on these routes request but not for 
  all request
 */

module.exports = router;