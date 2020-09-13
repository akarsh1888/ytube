var express = require("express");
var router = express.Router();

import ArticleValidator from "../validators/article_validator";
import articleCtrl from "../controllers/article_controller";
router.route("/").get(articleCtrl.list);

router
  .route("/:articleId")
  .get([ArticleValidator.uuidValidator, articleCtrl.get])
  .put([ArticleValidator.uuidValidator, articleCtrl.update])
  .delete([ArticleValidator.uuidValidator, articleCtrl.delete]);

module.exports = router;
