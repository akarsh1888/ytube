const User = require("../database/models/user_model");

export async function findAll({ limit = 50, offset = 0 } = {}) {
  return await User.find({});
}

export async function findById(UserId) {
  return await User.findById(UserId);
  // .populate("posts");
}
export async function deleteUser(UserId) {
  return await User.findByIdAndRemove(UserId);
}
export async function createUser(user) {
  return await User.create(user);
}

// for validation of unique username
export async function findByUserName(name) {
  return await User.findOne({ userName: name });
}
