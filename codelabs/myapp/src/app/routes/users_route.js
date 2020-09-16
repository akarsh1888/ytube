import UserValidator from '../validators/user.validator'
import ArticleValidator from '../validators/article_validator'
import UserCtrl from '../controllers/user_controller'
import ArticleCtrl from '../controllers/article_controller'
var express = require('express')
var router = express.Router()
// Get all users based on input criteria such as status, limit..
// Create a new user
router
  .route('/')
  .get(UserCtrl.list)
  .post([
    UserValidator.reqValidator,
    UserValidator.uniqueValidator,
    UserCtrl.create,
  ])
// 	Get a user by userid
// 	Delete a user by userid
router
  .route('/:userId')
  .get(UserCtrl.get)
  .put(UserCtrl.put)
  .delete(UserCtrl.delete)

/**
 *
 * here below, we r running a array of middlewares ie. input Validation
 * before going to controllers for evaluating response
 * these middlewares r specific to these request only ,registered on these routes request but not for 
  all request
 */

router
  .route('/:userId/articles')
  .get(ArticleCtrl.getPostByUser)
  .post([ArticleValidator.reqValidator, ArticleCtrl.create])

module.exports = router
