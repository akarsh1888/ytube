import User from '../models/user_model'

/*
MongoDB = takes JSON spits out JSON thats it
mongoose = sits on top and add some additional properties for easy interaction with features of Mongo
DB easily for the client, eg. mongoose document object
 */

export function findAll(filter) {
  // below statement is returnin a non-enumerable mongoose [document object], console.log() will also
  // show few properties
  // but there r bunch of ohter methods on this mongoose [document object]
  // we will be passing around  normal JS Object not these ones for performance reason
  return User.find(filter).exec()
}

export function createUser(user) {
  return User.create(user)
}

export function findUser(UserId) {
  // mimics like a promise but not a real promise
  // exec() command is stopping mongoDB and telling there are no more join query has to be done on this result
  return User.findById(UserId).exec()
  // .populate("posts");
}
export function updateUser(userId, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  return User.findByIdAndUpdate(userId, user, {
    new: true,
  }).exec()
}
export function deleteUser(UserId) {
  return User.findByIdAndRemove(UserId).exec()
}

// for validation of unique username this service is used in that middleware
export function findByUserName(name) {
  return User.findOne({ userName: name })
}

/*
Unused API DB Operations for learning
*/

export const findByFilter = (filter) => {}
