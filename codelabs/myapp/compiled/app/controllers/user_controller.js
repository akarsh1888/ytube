"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var userService = _interopRequireWildcard(require("../services/user_services"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Controller r also a middleware but with the intent of serving the data
They r the final middleware in the stack for a request, no intention to proceed to do next(),pass on
to another middleware mostly avoided
*/
const UserController = {
  list: async (req, res, next) => {
    var filter = {};
    req.query.username ? filter.userName = req.query.username : filter = {};

    try {
      const data = await userService.findAll(filter); // u can use send or json ,as express is smart enough to figure it out
      //  return res.json(data)
      // it is a return statement written here , treat it as a return implicitly,

      res.status(200).send(data); // don't do this,
      // u can choose either this OR below for error handling
      // it will pass to the next middleware which we registered after all routes on the base page
      // next(err)
    } catch (err) {
      res.status(500).send('errorMessages.SERVER_ERROR');
    }
  },
  create: async (req, res, next) => {
    const user = req.body;

    try {
      const data = await userService.createUser(user);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  get: async (req, res, next) => {
    const {
      userId
    } = req.params;

    try {
      const data = await userService.findUser(userId);

      if (!data) {
        res.status(404).send(_error.default.USER_NOT_FOUND);
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  put: async (req, res) => {
    const userId = req.params.userId;
    const user = req.body;

    try {
      const data = await userService.updateUser(userId, user);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  delete: async (req, res) => {
    const userId = req.params.userId;

    try {
      const data = await userService.deleteUser(userId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  }
};
var _default = UserController;
exports.default = _default;