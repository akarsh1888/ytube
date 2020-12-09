"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModerator = exports.isAdmin = void 0;

const isAdmin = async (req, res, next) => {
  // const user = await Auth.findById(req.user.id).exec()
  // const roles = await Role.find({ _id: { $in: req.user.roles } })
  var flag = false;
  req.user.roles.forEach(role => {
    if (role === 'ADMIN') {
      flag = true;
    }
  });

  if (flag) {
    next();
  } else {
    res.status(403).send({
      message: 'Require Admin Role!'
    });
  }
};

exports.isAdmin = isAdmin;

const isModerator = async (req, res, next) => {
  // const user = await Auth.findById(req.user.id).exec()
  // const roles = await Role.find({ _id: { $in: user.roles } })
  var flag = false;
  req.user.roles.forEach(role => {
    if (role === 'MODERATOR') {
      flag = true;
    }
  });

  if (flag) {
    next();
  } else {
    res.status(403).send({
      message: 'Require Moderator Role!'
    });
  }
};

exports.isModerator = isModerator;