"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findProfile = findProfile;
exports.updateProfile = updateProfile;
exports.findByUserName = findByUserName;

var _auth = _interopRequireDefault(require("../models/auth.model"));

var _profile = _interopRequireDefault(require("../models/profile.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
MongoDB = takes JSON spits out JSON thats it
mongoose = sits on top and add some additional properties for easy interaction with features of 
Mongo DB easily for the client, eg. mongoose document object
 */
// below statement is returnin a non-enumerable mongoose [document object],
// console.log() will also show few properties
// but there r bunch of ohter methods on this mongoose [document object]
// we will be passing around  normal JS Object not these ones for performance reason
async function findProfile(id) {
  // mimics like a promise but not a real promise
  // exec() command is stopping mongoDB and telling there are no more join query 
  // has to be done on this result
  const {
    profile
  } = await _auth.default.findById(id);
  return _profile.default.findById(profile).exec();
}

async function updateProfile(id, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  const {
    profile
  } = await _auth.default.findById(id);
  return _profile.default.findByIdAndUpdate(profile, user, {
    new: true
  }).exec();
} // for validation of unique username this service is used in that middleware


function findByUserName(name) {
  return _profile.default.findOne({
    userName: name
  });
}