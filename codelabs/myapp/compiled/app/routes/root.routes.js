"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../controllers/auth.ctrl"));

var _auth2 = require("../validators/auth.validator");

var _authenticate = require("../middlewares/authenticate");

var _authorize = require("../middlewares/authorize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');

var router = express.Router();

var profileRoutes = require('./profile.routes');

var postRouter = require('./post.routes');
/*
Why nested/branches routing ?
each branches API's can have separate authentication mechanism
so that some APIs, serving just static assets dont get blocked for authentication,
some API's for JSON only
treating them separate branches gives modularity 
*/


router.post('/signup', [_auth2.verifySignUp], [_auth2.assignRoleId], _auth.default.signup);
router.post('/login', [_auth2.verifyLogin], [_auth2.addAuthorities], _auth.default.login);
router.use('/profile', [_authenticate.verifyToken], profileRoutes);
router.use('/post', [_authenticate.verifyToken], postRouter);
var _default = router;
exports.default = _default;