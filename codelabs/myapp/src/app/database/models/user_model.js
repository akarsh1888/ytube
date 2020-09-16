var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserModelSchema = new Schema({
  userName: { type: String, required: true },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  status: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
})

/*  
schema hold the instructions for model, ie.validation,indexes etc.
here schema is converted into model,model is the JSON way of interacting with the database
*/

module.exports = mongoose.model('User', UserModelSchema)
