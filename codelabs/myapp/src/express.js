import express from 'express'
import { json, urlencoded } from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
// import helmet from 'helmet'
import errorMessages from './config/error.messages'
import indexRouter from './app/routes/index'
import cors from 'cors'
import morgan from 'morgan'
import parentRouter from './app/routes/parent'
import jwt from 'jsonwebtoken'
var logger = require('winston')
var hbs = require('express-handlebars')
var path = require('path')

export const start = () => {
  // Initialize express app
  var app = express()

  // *******************************
  // Server  Side Template Engine Setup

  // view engine setup
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      defaultLayout: 'layout',
      layoutsDir: path.join(__dirname, '/app/views/layouts/'),
    })
  )
  // path to the directory where all views are saved
  app.set('views', path.join(__dirname, '/app', 'views'))
  // other engines also available :: 1) hbs (handlebars) 2) jade  3)pug
  app.set('view engine', 'hbs')

  // Showing stack errors
  app.set('showStackError', true)

  // CookieParser should be above session
  app.use(cookieParser())

  /**************
  MIddleware for transforming request,authentication,validation,
   */
  // Request body parsing middleware should be above methodOverride
  app.use(json({ type: 'application/*', limit: '30mb' }))
  // for using query string in the URL, body parser method library is used
  app.use(urlencoded({ extended: true }))
  // for cross domain communication from browser
  const corsOptions = {
    exposedHeaders: 'Authorization',
  }
  app.use(cors(corsOptions))
  // for logging out
  app.use(morgan('dev'))
  app.use(methodOverride())
  //   app.use(express.static(path.join(__dirname + "/app", "public")));

  // Use helmet to secure Express headers
  //   app.use(helmet.xframe());
  //   app.use(helmet.xssFilter());
  //   app.use(helmet.nosniff());
  //   app.use(helmet.ienoopen());

  const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token)
    if (!token) return res.status(401).send('No token passed')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userKey) => {
      if (err) return res.status(403).send('Token passed is invalid')
      console.log(userKey)
      req.user = userKey
      next()
    })
  }

  app.disable('x-powered-by')

  /*
  //************* Middlewares has to be wrote before going to server routing/controlling program 
  but has power to behave as a controller ie. sometimes they have to response to client there only without 
  going to the next middleware...
  but should be avoided, they should not response any data
  */
  const somemiddleman = (req, res, next) => {
    console.log('Pass through me baby')
    /**
     * If error not handled properly */
    // throw new Error("app will crash");
    /*
     * Sharing data between middlewares */
    // attaching to request object
    // req.data = "Some data";
    next()
  }
  /* middlewares registerd on the routes */
  app.use('/', [somemiddleman], (req, res, next) => {
    // res.send({ message: req.data });
    next()
  })
  app.use('/', indexRouter)
  app.use('/api', parentRouter)

  // app.get('*', (req, res) =>
  //   res.status(404).send({
  //     message: 'Page Not Found',
  //     currentservertime: new Date().toLocaleTimeString(),
  //   })
  // )

  const users = [
    { id: 1, username: 'admin', password: 'admin' },
    { id: 2, username: 'guest', password: 'guest' },
  ]

  // secret api
  app.get('/secret', [authenticate], (req, res) => {
    res.status(200).json('This is a private resource')
  })

  /***
   * When we call next() function on a middleware control passes to another middleware
   *   ie. here in this case, controller written above are passing to these below error handlers
   *   middleware if it any occurs
   *
   */
  // error handler middleware if error occurs from the controller
  app.use(function (err, req, res, next) {
    let errorMsg
    if (err.name === 'SyntaxError' && err.message.indexOf('Unexpected') >= 0) {
      errorMsg = errorMessages.UNPARSABLE_REQUEST
      res.status(400).send(errorMsg)
      //   res.render("error");
      return
    }
    errorMsg = errorMessages.SERVER_ERROR
    logger.error(err.stack)
    res.status(500).send(errorMsg)
    // res.render("error");
  })
  // Assume 404 since no middleware responded
  app.use((req, res) => {
    console.log('request ' + req.path + ' not found')
    const notFound = errorMessages.NOT_FOUND
    res.status(404).send(notFound)
  })

  /************************************
   * 88888 */
  console.log('completed configuring express application')
  return app
}
