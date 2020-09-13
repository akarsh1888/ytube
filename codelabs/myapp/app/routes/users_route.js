var express = require("express");
var router = express.Router();

import UserValidator from "../validators/user.validator";
import ArticleValidator from "../validators/article_validator";
import UserCtrl from "../controllers/user_controller";
import ArticleCtrl from "../controllers/article_controller";
// Get all users based on input criteria such as status, limit..
router.route("/").get(UserCtrl.list);
// 	Get a user by userid
router.route("/:userId").get(UserCtrl.get);
// 	Delete a user by userid
router.route("/:userId").delete(UserCtrl.delete);
// Create a new user
router
  .route("/")
  .post([
    UserValidator.reqValidator,
    UserValidator.uniqueValidator,
    UserCtrl.create,
  ]);

router
  .route("/:userId/articles")
  .get(ArticleCtrl.getPostByUser)
  .post([ArticleValidator.reqValidator, ArticleCtrl.create]);

module.exports = router;
