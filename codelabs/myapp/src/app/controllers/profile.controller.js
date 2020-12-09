import errorMessages from '../../config/error.messages'
import * as profileService from '../services/profile.service'

/*
Controller r also a middleware but with the intent of serving the data
They r the final middleware in the stack for a request, no intention to proceed to do next(),pass on
to another middleware mostly avoided
*/

const profileCtrl = {
  get: async (req, res, next) => {
    const { id } = req.user
    try {
      const data = await profileService.findProfile(id)
      if (!data) {
        res.status(404).send(errorMessages.USER_NOT_FOUND)
      }
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR)
    }
  },
  put: async (req, res) => {
    const { id } = req.user
    const { user } = req.body
    try {
      const data = await profileService.updateProfile(id, user)
      res.status(200).json(data)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

}

export default profileCtrl
