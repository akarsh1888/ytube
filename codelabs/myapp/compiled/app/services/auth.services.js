"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpUser = signUpUser;
exports.loginUser = loginUser;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _error = _interopRequireDefault(require("../../config/error.messages"));

var _auth = _interopRequireDefault(require("../models/auth.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUpUser(user) {
  return _auth.default.create(user);
}

async function loginUser(user) {
  const userJwtInfo = {
    id: user.id,
    email: user.email
  };
  return _jsonwebtoken.default.sign(userJwtInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3hrs'
  });
}