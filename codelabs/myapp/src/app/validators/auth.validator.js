/* eslint-disable camelcase */
import bcrypt from 'bcrypt'
import commonUtil from '../util/common.util'
import errorMessages from '../../config/error.messages'
import Auth from '../models/auth.model'
import Role from '../models/role.model'

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

export const verifySignUp = async (req, res, next) => {
  try {
    const {
      userName,
      email,
      password,
      password_confirmation,
      roles,
    } = req.body.user
    if (!(userName && email && password && password_confirmation && roles))
      return res.send(
        new Response('error', 'Fill all Input Fields', [], 'Incorrect Input')
      )
    if (password !== password_confirmation)
      return res.send(
        new Response('error', 'Password Not Matching', [], 'Incorrect Input')
      )
    const data = await Auth.findOne({ email })
    if (data)
      return res.send(
        new Response(
          'error',
          'Email already registered,please Sign-In',
          [],
          'Email already exist in the database'
        )
      )
    const data2 = await Auth.findOne({ userName })
    if (data2)
      return res.send(
        new Response(
          'error',
          'User name already taken,please choose another one',
          [],
          'Username already exist in the database'
        )
      )

    const hashedPassword = await bcrypt.hash(password, 10)
    req.body.user.password = hashedPassword
  } catch (error) {
    res.status(500).send(error.Message)
  }
  next()
}

export const assignRoleId = async (req, res, next) => {
  try {
    if (req.body.user.roles.length) {
      const roles = await Role.find({ name: { $in: req.body.user.roles } })
      req.body.user.roles = roles.map((role) => role._id)
      next()
    } else {
      const role = await Role.findOne({ name: 'user' })
      req.body.user.roles = [role._id]
      next()
    }
  } catch (err) {
    res.status(500).send(err.Message)
  }
}

export const verifyLogin = async (req, res, next) => {
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
      return res.send(
        new Response(
          'error',
          'Password Given is Wrong',
          [],
          "Password doesn't match"
        )
      )
    }
  } catch (error) {
    res.status(500).send(errorMessages.SERVER_ERROR)
  }
}

export const addAuthorities = async (req, res, next) => {
  const user = await Auth.findById(req.body.user.id).populate('roles').exec()
  req.body.user.roles = user.roles.map((role) => role.name.toUpperCase())
  next()
}

