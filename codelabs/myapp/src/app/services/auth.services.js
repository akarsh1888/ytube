import jwt from 'jsonwebtoken'
import errorMessages from '../../config/error.messages'
import Auth from '../models/auth.model'

export async function signUpUser(user) {
  return Auth.create(user)
}

export async function loginUser(user) {
  const userJwtInfo = {
    id: user.id,
    email: user.email,
  }

  return jwt.sign(userJwtInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '3hrs',
  })
}
