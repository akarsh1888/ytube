import errorMessages from '../../config/error.messages'
import * as authService from '../services/auth.services'

function Response(status, data, messages, errors) {
  this.status = status
  this.data = data
  this.messages = messages
  this.errors = errors
}

const authCtrl = {
  signup: async (req, res, next) => {
    try {
      delete req.body.user.password_confirmation
      const data = await authService.signUpUser(req.body.user)
      res.send(new Response('ok', data, 'User Registered Successfully', []))
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  login: async (req, res, next) => {
    try {
      const token = await authService.loginUser(req.body.user)
      res.header('authorization', token).send(
        new Response(
          'ok',
          {
            token: token,
            roles: req.body.user.roles,
          },
          'Login Successfully',
          []
        )
      )
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
}

export default authCtrl
