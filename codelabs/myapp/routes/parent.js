var express = require("express");
var router = express.Router();
// const RootController = require("../controllers/index");

var userRouter = require("./users");
var testRouter = require("./test");
var cartRouter = require("./cart_route");
router.get("/", (req, res) =>
  res.status(200).json({ message: "iam sending parent data" })
);
// ****************************************************************************88
router.use("/user", userRouter);
router.use("/test", testRouter);
router.use("/cart", cartRouter);

module.exports = router;
