"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAll = findAll;
exports.createUser = createUser;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.findByUserName = findByUserName;

const User = require('../database/models/user_model');

function findAll({
  limit = 50,
  offset = 0
} = {}) {
  return User.find({});
}

function createUser(user) {
  return User.create(user);
}

function findUser(UserId) {
  return User.findById(UserId); // .populate("posts");
}

function updateUser(userId, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  return User.findByIdAndUpdate(userId, user, {
    new: true
  });
}

function deleteUser(UserId) {
  return User.findByIdAndRemove(UserId);
} // for validation of unique username this service is used in that middleware


function findByUserName(name) {
  return User.findOne({
    userName: name
  });
}