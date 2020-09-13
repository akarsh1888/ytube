var express = require("express");
var router = express.Router();
// const RootController = require("../controllers/index");

var usersRouter = require("./users_route");
var testRouter = require("./test");
var cartRouter = require("./cart_route");
var articlesRouter = require("./article_route");

router.get("/", (req, res) =>
  res.status(200).json({ message: "iam sending parent data" })
);
// ****************************************************************************88
router.use("/users", usersRouter);
router.use("/test", testRouter);
router.use("/cart", cartRouter);
router.use("/articles", articlesRouter);

module.exports = router;
