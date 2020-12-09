"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = _interopRequireDefault(require("../util/common.util"));

var _error = _interopRequireDefault(require("../../config/error.messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MIDDLEWARE FOR VALIDATING USER INFO SEND BY THE CLIENT
// FOR VALIDATING THE REQUEST BODY
const validators = {
  reqValidator: (req, resp, next) => {
    const body = req.body.article;
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
  },
  // UNIQUE ID
  uuidValidator: (req, resp, next) => {
    const postId = req.params.articleId;

    if (true) {
      next();
    } else {
      resp.status(400).end(_error.default.POST_ID_INVALID);
    }
  }
};
var _default = validators;
exports.default = _default;