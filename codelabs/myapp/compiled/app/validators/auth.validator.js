"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthorities = exports.verifyLogin = exports.assignRoleId = exports.verifySignUp = exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _common = _interopRequireDefault(require("../util/common.util"));

var _error = _interopRequireDefault(require("../../config/error.messages"));

var _auth = _interopRequireDefault(require("../models/auth.model"));

var _role = _interopRequireDefault(require("../models/role.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
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

const verifySignUp = async (req, res, next) => {
  try {
    const {
      userName,
      email,
      password,
      password_confirmation,
      roles
    } = req.body.user;
    if (!(userName && email && password && password_confirmation && roles)) return res.send(new Response('error', 'Fill all Input Fields', [], 'Incorrect Input'));
    if (password !== password_confirmation) return res.send(new Response('error', 'Password Not Matching', [], 'Incorrect Input'));
    const data = await _auth.default.findOne({
      email
    });
    if (data) return res.send(new Response('error', 'Email already registered,please Sign-In', [], 'Email already exist in the database'));
    const data2 = await _auth.default.findOne({
      userName
    });
    if (data2) return res.send(new Response('error', 'User name already taken,please choose another one', [], 'Username already exist in the database'));
    const hashedPassword = await _bcrypt.default.hash(password, 10);
    req.body.user.password = hashedPassword;
  } catch (error) {
    res.status(500).send(error.Message);
  }

  next();
};

exports.verifySignUp = verifySignUp;

const assignRoleId = async (req, res, next) => {
  try {
    if (req.body.user.roles.length) {
      const roles = await _role.default.find({
        name: {
          $in: req.body.user.roles
        }
      });
      req.body.user.roles = roles.map(role => role._id);
      next();
    } else {
      const role = await _role.default.findOne({
        name: 'user'
      });
      req.body.user.roles = [role._id];
      next();
    }
  } catch (err) {
    res.status(500).send(err.Message);
  }
};

exports.assignRoleId = assignRoleId;

const verifyLogin = async (req, res, next) => {
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
      return res.send(new Response('error', 'Password Given is Wrong', [], "Password doesn't match"));
    }
  } catch (error) {
    res.status(500).send(_error.default.SERVER_ERROR);
  }
};

exports.verifyLogin = verifyLogin;

const addAuthorities = async (req, res, next) => {
  const user = await _auth.default.findById(req.body.user.id).populate('roles').exec();
  req.body.user.roles = user.roles.map(role => role.name.toUpperCase());
  next();
};

exports.addAuthorities = addAuthorities;