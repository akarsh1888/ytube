"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpUser = signUpUser;
exports.loginUser = loginUser;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../models/auth.model"));

var _profile = _interopRequireDefault(require("../models/profile.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function signUpUser(user) {
  const profile = await _profile.default.create({
    email: user.email,
    address: {
      other: true
    }
  });
  return _auth.default.create(_objectSpread(_objectSpread({}, user), {}, {
    profile: profile._id
  }));
}

async function loginUser(user) {
  const userJwtInfo = {
    id: user.id,
    email: user.email,
    roles: user.roles
  };
  return _jsonwebtoken.default.sign(userJwtInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12hrs'
  });
}