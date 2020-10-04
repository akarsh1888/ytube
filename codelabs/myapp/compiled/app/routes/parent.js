"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../controllers/auth.ctrl"));

var _auth2 = require("../validators/auth.validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();

var usersRouter = require('./users_route');

var articlesRouter = require('./article_route');
/*
Why nested/branches routing ?
each branches API's can have separate authentication mechanism
so that some APIs, serving just static assets dont get blocked for authentication,
some API's for JSON only
treating them separate branches gives modularity 
*/


router.post('/signup', [_auth2.hashedPassword], _auth.default.signup);
router.post('/login', [_auth2.checkLogin], _auth.default.login);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
var _default = router;
exports.default = _default;