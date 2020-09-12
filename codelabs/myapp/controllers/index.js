var RootService = require("../services/index");
var rootService = new RootService();

// controllers decide which of data should be send to the route
// ie. 1) html view 2)read/write from DB using some (DATA MODELS)   3) normal json/text response
class RootController {
  async createUser(req, res) {
    // http post
    try {
      const data = await rootService.createUser(req.body);
      return res.status(200).send({
        message: "USER STORED SUCCESSFULLY",
        data,
      });
    } catch (err) {
      return res.status(500).send(err);
    }

    /**
     * WITHOUT ASYNC AWAIT
     */

    //     .then((data) => {
    //       res.status(200).json({
    //         message: "DATA STORED SUCCESSFULLY",
    //         data,
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(500).send(err);
    //     });
  }

  getUsers(req, res) {
    return rootService
      .getUsers()
      .then((data) => {
        res.status(200).send({
          message: "USER FETCHED SUCCESSFULLY",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  getUserByEmail(req, res) {
    return rootService
      .getUserByEmail(req.params.email)
      .then((data) => {
        res.status(200).send({
          message: "USER FETCHED BY EMAIL SUCCESSFULLY",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  deleteUserByEmail(req, res) {
    return rootService
      .removeUserByEmail(req.params.email)
      .then((data) => {
        res.status(200).send({
          message: "USER REMOVED SUCCESSFULLY",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
  filterUserByEmail(req, res) {
    // let flag = req.query.email === "true" ? true : false;
    // console.log(req.query);
    return rootService
      .filterUserByEmail()
      .then((data) => {
        res.status(200).send({
          message: "USERS FILTERED SUCCESSFULLY",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
}

module.exports = RootController;
