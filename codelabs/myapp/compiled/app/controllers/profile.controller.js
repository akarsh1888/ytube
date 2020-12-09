"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../../config/error.messages"));

var profileService = _interopRequireWildcard(require("../services/profile.service"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Controller r also a middleware but with the intent of serving the data
They r the final middleware in the stack for a request, no intention to proceed to do next(),pass on
to another middleware mostly avoided
*/
const profileCtrl = {
  get: async (req, res, next) => {
    const {
      id
    } = req.user;

    try {
      const data = await profileService.findProfile(id);

      if (!data) {
        res.status(404).send(_error.default.USER_NOT_FOUND);
      }

      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(_error.default.SERVER_ERROR);
    }
  },
  put: async (req, res) => {
    const {
      id
    } = req.user;
    const {
      user
    } = req.body;

    try {
      const data = await profileService.updateProfile(id, user);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
};
var _default = profileCtrl;
exports.default = _default;