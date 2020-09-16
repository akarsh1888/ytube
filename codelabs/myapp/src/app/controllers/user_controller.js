import errorMessages from '../../config/error.messages'
import * as userService from '../services/user_services'

/*
Controller r also a middleware but with the intent of serving the data
They r the final middleware in the stack for a request, no intention to proceed to do next(),pass on
to another middleware mostly avoided
*/

const UserController = {
  list: async (req, res, next) => {
    try {
      const data = await userService.findAll(req.query)
      // u can use send or json ,as express is smart enough to figure it out
      //  return res.json(data)
      // it is a return statement written here , treat it as a return implicitly,
      res.status(200).send(data)
      // don't do this,
      // u can choose either this OR below for error handling
      // it will pass to the next middleware which we registered after all routes on the base page
      // next(err)
    } catch (err) {
      res.status(500).send('errorMessages.SERVER_ERROR')
    }
  },
  create: async (req, res, next) => {
    const user = req.body
    try {
      const data = await userService.createUser(user)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  get: async (req, res, next) => {
    const { userId } = req.params
    try {
      const data = await userService.findUser(userId)
      if (!data) {
        res.status(404).send(errorMessages.USER_NOT_FOUND)
      }
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  put: async (req, res) => {
    const userId = req.params.userId
    const user = req.body
    try {
      const data = await userService.updateUser(userId, user)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  delete: async (req, res) => {
    const userId = req.params.userId
    try {
      const data = await userService.deleteUser(userId)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
}

export default UserController
