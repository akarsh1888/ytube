"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = _interopRequireDefault(require("../util/common.util"));

var _error = _interopRequireDefault(require("../../config/error.messages"));

var _user_services = require("../services/user_services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MIDDLEWARE FOR VALIDATING USER INFO SEND BY THE CLIENT
// FOR VALIDATING THE REQUEST BODY
const validators = {
  reqValidator: (req, resp, next) => {
    const body = req.body;
    let message;

    if (body) {
      if (!body.userName || body.userName.length < 3) {
        message = _error.default.USER_DATA_USERNAME_INVALID;
      } else if (_common.default.isEmty(body.firstName)) {
        message = _error.default.USER_DATA_FIRSTNAME_INVALID;
      } else if (_common.default.isEmty(body.lastName)) {
        message = _error.default.USER_DATA_LASTNAME_INVALID;
      } else {
        next();
        return;
      }
    } else {
      message = _error.default.USER_DATA_INVALID;
    }

    resp.status(400).json({
      message
    });
  },
  // UNIQUE USERNAME SHOULD BE THERE,GOING TO CHECK FROM THE DB & THEN ONLY IT WILL PASS TO CONTROLLER
  uniqueValidator: async (req, resp, next) => {
    const data = await (0, _user_services.findByUserName)(req.body.userName);

    if (data) {
      // username already exist
      resp.status(400).send(_error.default.USER_USERNAME_TAKEN);
    } else {
      next();
    }
  }
};
var _default = validators;
exports.default = _default;