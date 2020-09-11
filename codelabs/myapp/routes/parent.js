var express = require("express");
var router = express.Router();
// const RootController = require("../controllers/index");

var userRouter = require("./users");
var testRouter = require("./test");

// each route is communicating to the controller which will be doing some async, I/O task & gets data for us
// *******************  Iam using controllers to evaluate the response data
// const rootController = new RootController();
router.get("/", (req, res) => res.status(200).json({ message: "plaintext" }));
// ****************************************************************************88
router.use("/user", userRouter);
router.use("/test", testRouter);

module.exports = router;
