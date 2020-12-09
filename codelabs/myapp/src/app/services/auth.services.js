import jwt from 'jsonwebtoken'
import Auth from '../models/auth.model'
import Profile from '../models/profile.model'

export async function signUpUser(user) {
  const profile = await Profile.create({
    email: user.email,
    address: { other: true },
  })
  return Auth.create({ ...user, profile: profile._id })
}

export async function loginUser(user) {
  const userJwtInfo = {
    id: user.id,
    email: user.email,
    roles: user.roles,
  }

  return jwt.sign(userJwtInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '12hrs',
  })
}
