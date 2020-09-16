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
router.get('/', (req, res) =>
  res.status(200).json({ message: 'iam on parent default route' })
)

router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

export default router
