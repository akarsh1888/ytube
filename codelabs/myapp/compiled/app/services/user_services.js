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
exports.findByFilter = void 0;

var _user_model = _interopRequireDefault(require("../models/user_model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
MongoDB = takes JSON spits out JSON thats it
mongoose = sits on top and add some additional properties for easy interaction with features of Mongo
DB easily for the client, eg. mongoose document object
 */
function findAll(filter) {
  // below statement is returnin a non-enumerable mongoose [document object], console.log() will also
  // show few properties
  // but there r bunch of ohter methods on this mongoose [document object]
  // we will be passing around  normal JS Object not these ones for performance reason
  return _user_model.default.find(filter).exec();
}

function createUser(user) {
  return _user_model.default.create(user);
}

function findUser(UserId) {
  // mimics like a promise but not a real promise
  // exec() command is stopping mongoDB and telling there are no more join query has to be done on this result
  return _user_model.default.findById(UserId).exec(); // .populate("posts");
}

function updateUser(userId, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  return _user_model.default.findByIdAndUpdate(userId, user, {
    new: true
  }).exec();
}

function deleteUser(UserId) {
  return _user_model.default.findByIdAndRemove(UserId).exec();
} // for validation of unique username this service is used in that middleware


function findByUserName(name) {
  return _user_model.default.findOne({
    userName: name
  });
}
/*
Unused API DB Operations for learning
*/


const findByFilter = filter => {};

exports.findByFilter = findByFilter;