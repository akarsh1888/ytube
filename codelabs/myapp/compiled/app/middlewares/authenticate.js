"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verifyToken = (req, res, next) => {
  // req.headers["x-access-token"];
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('No token passed');

  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userKey) => {
    if (err) return res.status(403).send('Token passed is invalid');
    req.user = userKey;
    next();
  });
};

exports.verifyToken = verifyToken;