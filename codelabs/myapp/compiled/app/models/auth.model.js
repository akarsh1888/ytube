"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Role'
  }],
  profile: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Profile'
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model('Auth', authSchema);

exports.default = _default;