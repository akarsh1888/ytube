"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const config = {
  db: {
    database: 'blog-prod',
    username: 'admin-prod',
    password: 'admin',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  },
  log: {
    //morgan options: 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    //winston config
    transports: {
      file: {
        level: 'debug',
        filename: '../logs/applog.log',
        handleExceptions: true,
        json: false,
        maxsize: 5242880,
        //5MB
        colorize: false
      }
    }
  }
};
var _default = config;
exports.default = _default;