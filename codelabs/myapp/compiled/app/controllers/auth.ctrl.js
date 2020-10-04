"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var authService = _interopRequireWildcard(require("../services/auth.services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Response(status, data, messages, errors) {
  this.status = status;
  this.data = data;
  this.messages = messages;
  this.errors = errors;
}

const operations = {
  signup: async (req, res, next) => {
    try {
      const data = await authService.signUpUser(req.body.user);
      res.send(new Response('ok', data, 'User Registered Successfully', []));
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  login: async (req, res, next) => {
    try {
      const token = await authService.loginUser(req.body.user);
      res.header('authorization', token).send(new Response('ok', 'Token Attached in Headers', 'Login Successfully', []));
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  }
};
var _default = operations;
exports.default = _default;