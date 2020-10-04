"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLogin = exports.hashedPassword = exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _common = _interopRequireDefault(require("../util/common.util"));

var _error = _interopRequireDefault(require("../../config/error.messages"));

var _auth = _interopRequireDefault(require("../models/auth.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Response(status, data, messages, errors) {
  this.status = status;
  this.data = data;
  this.messages = messages;
  this.errors = errors;
} // MIDDLEWARE FOR VALIDATING USER INFO SEND BY THE CLIENT
// FOR VALIDATING THE REQUEST BODY


const validators = {
  reqValidator: (req, resp, next) => {
    const body = req.body;
    let message;

    if (body) {
      if (_common.default.isEmty(body.title)) {
        message = _error.default.POST_DATA_TITLE_INVALID;
      } else if (_common.default.isEmty(body.content)) {
        message = _error.default.POST_DATA_CONTENT_INVALID;
      } else {
        next();
        return;
      }
    } else {
      message = _error.default.POST_DATA_INVALID;
    }

    resp.status(400).end(message);
  }
};
var _default = validators;
exports.default = _default;

const hashedPassword = async (req, res, next) => {
  const {
    password,
    username,
    email
  } = req.body.user;
  const hashedPassword = await _bcrypt.default.hash(password, 10);
  req.body.user.password = hashedPassword;
  const data = await _auth.default.findOne({
    email
  });
  if (data) return res.send(new Response('error', 'User already registered,please sign in', [], 'Email already exist in the database'));
  const data2 = await _auth.default.findOne({
    username
  });
  if (data2) return res.send(new Response('error', 'User name already taken,please choose another one', [], 'Username already exist in the database'));
  next();
};

exports.hashedPassword = hashedPassword;

const checkLogin = async (req, res, next) => {
  const {
    password,
    email
  } = req.body.user;

  try {
    const data = await _auth.default.findOne({
      email
    });

    if (!data) {
      return res.send(new Response('error', 'User Email not registered yet', [], "Email doesn't exist in the database"));
    }

    if (await _bcrypt.default.compare(password, data.password)) {
      req.body.user.id = await data._id;
      next();
    } else {
      return res.send(new Response('error', {}, [], "Password doesn't match"));
    }
  } catch (error) {
    res.status(500).send(_error.default.SERVER_ERROR);
  }
};

exports.checkLogin = checkLogin;