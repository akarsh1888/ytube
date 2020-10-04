import mongoose from 'mongoose'

var auth = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true, max: 1024, min: 6 },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Auth = mongoose.model('auth', auth)
export default Auth
