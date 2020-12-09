import authCtrl from '../controllers/auth.ctrl'
import {
  verifySignUp,
  verifyLogin,
  assignRoleId,
  addAuthorities,
} from '../validators/auth.validator'
import { verifyToken } from '../middlewares/authenticate'
import { isAdmin, isModerator } from '../middlewares/authorize'
var express = require('express')
var router = express.Router()
var profileRoutes = require('./profile.routes')
var postRouter = require('./post.routes')
/*
Why nested/branches routing ?
each branches API's can have separate authentication mechanism
so that some APIs, serving just static assets dont get blocked for authentication,
some API's for JSON only
treating them separate branches gives modularity 
*/
router.post('/signup', [verifySignUp], [assignRoleId], authCtrl.signup)
router.post('/login', [verifyLogin], [addAuthorities], authCtrl.login)

router.use('/profile', [verifyToken], profileRoutes)
router.use('/post', [verifyToken], postRouter)

export default router
