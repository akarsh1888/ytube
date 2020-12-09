var mongoose = require('mongoose')

// small letter for schema definition
var profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    address: {
      other: Boolean,
      street: String,
      houseNumber: Number,
      zip: Number,
      city: String,
      State: String,
    },
    email: {
      type: String,
    },
    birthDate: {
      type: Date,
      default: Date.now,
    },
    betaUser: {
      default: false,
      type: Boolean,
    },
    pets: [{ type: String }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
)

profileSchema.virtual('totalPostCount').get(function () {
  return this.posts.length
})

profileSchema.index(
  {
    // district: 1,
    email: 1,
  },
  { unique: true }
)

/*  
schema hold the instructions for model, ie.validation,indexes etc.
here schema is converted into model,model is the JSON way of interacting with the database
*/

// capital letter for a model
export default mongoose.model('Profile', profileSchema)
