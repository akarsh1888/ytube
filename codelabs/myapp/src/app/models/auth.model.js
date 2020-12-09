import mongoose from 'mongoose'

var authSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true, max: 1024, min: 6 },
    date: {
      type: Date,
      default: Date.now,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
      },
    ],
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true }
)
export default mongoose.model('Auth', authSchema)
