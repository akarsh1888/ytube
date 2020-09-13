import errorMessages from "../../config/error.messages";
import * as userService from "../services/user_services";

const UserController = {
  list: async (req, res, next) => {
    try {
      const data = await userService.findAll(req.query);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  get: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const data = await userService.findById(userId);
      if (!data) {
        res.status(404).send(errorMessages.USER_NOT_FOUND);
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  delete: async (req, res) => {
    const userId = req.params.userId;
    try {
      const data = await userService.deleteUser(userId);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
  create: async (req, res, next) => {
    const user = req.body;
    try {
      const data = await userService.createUser(user);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).send(errorMessages.SERVER_ERROR);
    }
  },
};

export default UserController;
