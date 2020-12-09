import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
)

export default mongoose.model('Role', roleSchema)
