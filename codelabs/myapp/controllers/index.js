var RootService = require("../services/index");
var rootService = new RootService();

// controllers decide which of data should be send to the route
// ie. 1) html view 2)read/write from DB using some (DATA MODELS)   3) normal json/text response
class RootController {
  createUser(req, res) {
    // http post
    const data = rootService.createUser(req.body);
    console.log(req.body);
    return res.status(200).json({ message: data });
  }

  getUsers(req, res) {
    const data = rootService.getUsers();
    return res.status(200).json({ message: data });
  }
  getUserByEmail(req, res) {
    const data = rootService.getUserByEmail(req.params.email);
    return res.status(200).json({ message: data });
  }
  deleteUserByEmail(req, res) {
    var data = rootService.removeUserByEmail(req.params.email);
    return res.status(200).json(data);
  }
}

module.exports = RootController;
