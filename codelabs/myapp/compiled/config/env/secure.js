"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const confg = {
  log: {
    //morgan options: 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    //winston config
    transports: {
      file: {
        level: 'info',
        filename: './logs/applog.log',
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