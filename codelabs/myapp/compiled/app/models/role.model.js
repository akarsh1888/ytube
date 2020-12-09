"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roleSchema = new _mongoose.default.Schema({
  name: String
}, {
  timestamps: true
});

var _default = _mongoose.default.model('Role', roleSchema);

exports.default = _default;