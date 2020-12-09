import ArticleValidator from '../validators/article_validator'
import profileCtrl from '../controllers/profile.controller'
var express = require('express')
var router = express.Router()

router.route('/').get(profileCtrl.get).put(profileCtrl.put)

/**
 *
 * here below, we r running a array of middlewares ie. input Validation
 * before going to controllers for evaluating response
 * these middlewares r specific to these request only ,registered on these routes request but not for 
  all request
 */

module.exports = router
