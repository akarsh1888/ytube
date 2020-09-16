import ArticleValidator from '../validators/article_validator'
import articleCtrl from '../controllers/article_controller'
var express = require('express')
var router = express.Router()

router.route('/').get(articleCtrl.list)

router
  .route('/:articleId')
  .get([ArticleValidator.uuidValidator, articleCtrl.get])
  .put([ArticleValidator.uuidValidator, articleCtrl.put])
  .delete([ArticleValidator.uuidValidator, articleCtrl.delete])

module.exports = router
