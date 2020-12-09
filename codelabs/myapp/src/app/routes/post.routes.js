import ArticleValidator from '../validators/article_validator'
import postCtrl from '../controllers/post.controller'
var express = require('express')
var router = express.Router()

router.route('/').get(postCtrl.listAll).post(postCtrl.create)

router
  .route('/:postId')
  .put([ArticleValidator.uuidValidator, postCtrl.put])
  .delete([ArticleValidator.uuidValidator, postCtrl.delete])

router.route('/get_by_title').get([postCtrl.getPostByTitle])
router.route('/get_by_contentlength').get([postCtrl.getPostByContentLength])
router.route('/get_totalPostCount').get(postCtrl.getTotalPostCountByUser)

module.exports = router
