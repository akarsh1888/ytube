var express = require("express");
var router = express.Router();
var RootController = require("../controllers/index");

// each route is communicating to the controller which will be doing some async, I/O task & gets data for us
// *******************  Iam using controllers to evaluate the response data
var rootController = new RootController();

router
  .get("/", (req, res) => rootController.getUsers(req, res))
  .post("/", (req, res) => rootController.createUser(req, res));
// It is request parameter
router
  .get("/:email", (req, res) => rootController.getUserByEmail(req, res))
  .delete("/:email", (req, res) => rootController.deleteUserByEmail(req, res));
// It is query paramenter ?email=true
router.get("/filter/filter", (req, res) =>
  rootController.filterUserByEmail(req, res)
);

//************************8**************** */
module.exports = router;
