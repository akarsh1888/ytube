"use strict";

var _user = _interopRequireDefault(require("../validators/user.validator"));

var _article_validator = _interopRequireDefault(require("../validators/article_validator"));

var _user_controller = _interopRequireDefault(require("../controllers/user_controller"));

var _article_controller = _interopRequireDefault(require("../controllers/article_controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router(); // Get all users based on input criteria such as status, limit..
// Create a new user

router.route('/').get(_user_controller.default.list).post([_user.default.reqValidator, _user.default.uniqueValidator, _user_controller.default.create]); // 	Get a user by userid
// 	Delete a user by userid

router.route('/:userId').get(_user_controller.default.get).put(_user_controller.default.put).delete(_user_controller.default.delete);
/**
 *
 * here below, we r running a array of middlewares ie. input Validation
 * before going to controllers for evaluating response
 * these middlewares r specific to these request only ,registered on these routes request but not for 
  all request
 */

router.route('/:userId/articles').get(_article_controller.default.getPostByUser).post([_article_validator.default.reqValidator, _article_controller.default.create]);
module.exports = router;