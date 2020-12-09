import express from 'express'
import { json, urlencoded } from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
// import helmet from 'helmet'
import errorMessages from './config/error.messages'
import indexRouter from './app/routes/index'
import cors from 'cors'
import morgan from 'morgan'
import rootRouter from './app/routes/root.routes'
import multer from 'multer'
import logger from 'winston'
import hbs from 'express-handlebars'
import path from 'path'
import Role from './app/models/role.model'
const upload = multer()

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

  // for cross domain communication from browser
  const corsOptions = {
    exposedHeaders: 'Authorization',
  }
  app.use(cors(corsOptions))

  /**************
  MIddleware for transforming request,authentication,validation,
   */
  // Request body parsing middleware should be above methodOverride
  // for parsing application/json
  app.use(express.json({ type: 'application/*', limit: '30mb' }))
  // for using query string in the URL, body parser method library is used
  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }))

  // for parsing multipart/form-data
  // so, it can receive form-data, raw, or x-www-form-urlencoded.
  app.use(upload.array())
  app.use(express.static('public'))

  // for logging out
  app.use(morgan('dev'))
  app.use(methodOverride())
  //   app.use(express.static(path.join(__dirname + "/app", "public")));

  // Use helmet to secure Express headers
  //   app.use(helmet.xframe());
  //   app.use(helmet.xssFilter());
  //   app.use(helmet.nosniff());
  //   app.use(helmet.ienoopen());



  app.disable('x-powered-by')

  app.use('/', indexRouter)
  app.use('/api', rootRouter)

  // app.get('*', (req, res) =>
  //   res.status(404).send({
  //     message: 'Page Not Found',
  //     currentservertime: new Date().toLocaleTimeString(),
  //   })
  // )


  /***
   * When we call next() function on a middleware control passes to another middleware
   *   ie. here in this case, controller written above are passing to these below error handlers
   *   middleware if it any occurs
   *
   */
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

  // async function one() {
  //   const r = await Role.create({ name: 'admin' })
  //   const p = await Role.create({ name: 'moderator' })
  //   const q = await Role.create({ name: 'user' })
  // }
  // one()

  console.log('completed configuring express application')
  return app
}
