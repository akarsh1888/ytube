import commonUtil from "../util/common.util";
import errorMessages from "../../config/error.messages";
import { findByUserName } from "../services/user_services";
// MIDDLEWARE FOR VALIDATING USER INFO SEND BY THE CLIENT
// FOR VALIDATING THE REQUEST BODY
const validators = {
  reqValidator: (req, resp, next) => {
    const body = req.body;
    let message;
    if (body) {
      if (!body.userName || body.userName.length < 3) {
        message = errorMessages.USER_DATA_USERNAME_INVALID;
      } else if (commonUtil.isEmty(body.firstName)) {
        message = errorMessages.USER_DATA_FIRSTNAME_INVALID;
      } else if (commonUtil.isEmty(body.lastName)) {
        message = errorMessages.USER_DATA_LASTNAME_INVALID;
      } else {
        next();
        return;
      }
    } else {
      message = errorMessages.USER_DATA_INVALID;
    }
    resp.status(400).json({ message });
  },
  // UNIQUE USERNAME SHOULD BE THERE,GOING TO CHECK FROM THE DB & THEN ONLY IT WILL PASS TO CONTROLLER
  uniqueValidator: async (req, resp, next) => {
    const data = await findByUserName(req.body.userName);
    if (data) {
      // username already exist
      resp.status(400).send(errorMessages.USER_USERNAME_TAKEN);
    } else {
      next();
    }
  },
};
export default validators;
