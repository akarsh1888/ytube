import bcrypt from 'bcrypt'
import commonUtil from '../util/common.util'
import errorMessages from '../../config/error.messages'
import Auth from '../models/auth.model'

function Response(status, data, messages, errors) {
  this.status = status
  this.data = data
  this.messages = messages
  this.errors = errors
}

// MIDDLEWARE FOR VALIDATING USER INFO SEND BY THE CLIENT
// FOR VALIDATING THE REQUEST BODY
const validators = {
  reqValidator: (req, resp, next) => {
    const body = req.body
    let message
    if (body) {
      if (commonUtil.isEmty(body.title)) {
        message = errorMessages.POST_DATA_TITLE_INVALID
      } else if (commonUtil.isEmty(body.content)) {
        message = errorMessages.POST_DATA_CONTENT_INVALID
      } else {
        next()
        return
      }
    } else {
      message = errorMessages.POST_DATA_INVALID
    }
    resp.status(400).end(message)
  },
}
export default validators

export const hashedPassword = async (req, res, next) => {
  const { password, username, email } = req.body.user
  const hashedPassword = await bcrypt.hash(password, 10)
  req.body.user.password = hashedPassword
  const data = await Auth.findOne({ email })
  if (data)
    return res.send(
      new Response(
        'error',
        'User already registered,please sign in',
        [],
        'Email already exist in the database'
      )
    )
  const data2 = await Auth.findOne({ username })
  if (data2)
    return res.send(
      new Response(
        'error',
        'User name already taken,please choose another one',
        [],
        'Username already exist in the database'
      )
    )

  next()
}

export const checkLogin = async (req, res, next) => {
  const { password, email } = req.body.user
  try {
    const data = await Auth.findOne({ email })
    if (!data) {
      return res.send(
        new Response(
          'error',
          'User Email not registered yet',
          [],
          "Email doesn't exist in the database"
        )
      )
    }

    if (await bcrypt.compare(password, data.password)) {
      req.body.user.id = await data._id
      next()
    } else {
      return res.send(new Response('error', {}, [], "Password doesn't match"))
    }
  } catch (error) {
    res.status(500).send(errorMessages.SERVER_ERROR)
  }
}
