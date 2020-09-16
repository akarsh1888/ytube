const User = require('../database/models/user_model')

export function findAll({ limit = 50, offset = 0 } = {}) {
  return User.find({})
}

export function createUser(user) {
  return User.create(user)
}

export function findUser(UserId) {
  return User.findById(UserId)
  // .populate("posts");
}
export function updateUser(userId, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  return User.findByIdAndUpdate(userId, user, { new: true })
}
export function deleteUser(UserId) {
  return User.findByIdAndRemove(UserId)
}

// for validation of unique username this service is used in that middleware
export function findByUserName(name) {
  return User.findOne({ userName: name })
}
