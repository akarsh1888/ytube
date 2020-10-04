import authCtrl from '../controllers/auth.ctrl'
import { hashedPassword, checkLogin } from '../validators/auth.validator'
var express = require('express')
var router = express.Router()
var usersRouter = require('./users_route')
var articlesRouter = require('./article_route')

/*
Why nested/branches routing ?
each branches API's can have separate authentication mechanism
so that some APIs, serving just static assets dont get blocked for authentication,
some API's for JSON only
treating them separate branches gives modularity 
*/
router.post('/signup', [hashedPassword], authCtrl.signup)
router.post('/login', [checkLogin], authCtrl.login)

router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

export default router
