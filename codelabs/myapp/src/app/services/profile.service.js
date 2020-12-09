import Auth from '../models/auth.model'
import Profile from '../models/profile.model'

/*
MongoDB = takes JSON spits out JSON thats it
mongoose = sits on top and add some additional properties for easy interaction with features of 
Mongo DB easily for the client, eg. mongoose document object
 */

// below statement is returnin a non-enumerable mongoose [document object],
// console.log() will also show few properties
// but there r bunch of ohter methods on this mongoose [document object]
// we will be passing around  normal JS Object not these ones for performance reason

export async function findProfile(id) {
  // mimics like a promise but not a real promise
  // exec() command is stopping mongoDB and telling there are no more join query 
  // has to be done on this result
  const { profile } = await Auth.findById(id)
  return Profile.findById(profile).exec()
}
export async function updateProfile(id, user) {
  // mongoose return the new or modified object automatically, if new is set to true
  // otherwise it will return a old object before getting updated
  const { profile } = await Auth.findById(id)
  return Profile.findByIdAndUpdate(profile, user, {
    new: true,
  }).exec()
}

// for validation of unique username this service is used in that middleware
export function findByUserName(name) {
  return Profile.findOne({ userName: name })
}

