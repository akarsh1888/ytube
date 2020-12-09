"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _error = _interopRequireDefault(require("./config/error.messages"));

var _index = _interopRequireDefault(require("./app/routes/index"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _root = _interopRequireDefault(require("./app/routes/root.routes"));

var _multer = _interopRequireDefault(require("multer"));

var _winston = _interopRequireDefault(require("winston"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _role = _interopRequireDefault(require("./app/models/role.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import helmet from 'helmet'
const upload = (0, _multer.default)();

const start = () => {
  // Initialize express app
  var app = (0, _express.default)(); // *******************************
  // Server  Side Template Engine Setup
  // view engine setup

  app.engine('hbs', (0, _expressHandlebars.default)({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: _path.default.join(__dirname, '/app/views/layouts/')
  })); // path to the directory where all views are saved

  app.set('views', _path.default.join(__dirname, '/app', 'views')); // other engines also available :: 1) hbs (handlebars) 2) jade  3)pug

  app.set('view engine', 'hbs'); // Showing stack errors

  app.set('showStackError', true); // CookieParser should be above session

  app.use((0, _cookieParser.default)()); // for cross domain communication from browser

  const corsOptions = {
    exposedHeaders: 'Authorization'
  };
  app.use((0, _cors.default)(corsOptions));
  /**************
  MIddleware for transforming request,authentication,validation,
   */
  // Request body parsing middleware should be above methodOverride
  // for parsing application/json

  app.use(_express.default.json({
    type: 'application/*',
    limit: '30mb'
  })); // for using query string in the URL, body parser method library is used
  // for parsing application/x-www-form-urlencoded

  app.use(_express.default.urlencoded({
    extended: true
  })); // for parsing multipart/form-data
  // so, it can receive form-data, raw, or x-www-form-urlencoded.

  app.use(upload.array());
  app.use(_express.default.static('public')); // for logging out

  app.use((0, _morgan.default)('dev'));
  app.use((0, _methodOverride.default)()); //   app.use(express.static(path.join(__dirname + "/app", "public")));
  // Use helmet to secure Express headers
  //   app.use(helmet.xframe());
  //   app.use(helmet.xssFilter());
  //   app.use(helmet.nosniff());
  //   app.use(helmet.ienoopen());

  app.disable('x-powered-by');
  app.use('/', _index.default);
  app.use('/api', _root.default); // app.get('*', (req, res) =>
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
    let errorMsg;

    if (err.name === 'SyntaxError' && err.message.indexOf('Unexpected') >= 0) {
      errorMsg = _error.default.UNPARSABLE_REQUEST;
      res.status(400).send(errorMsg); //   res.render("error");

      return;
    }

    errorMsg = _error.default.SERVER_ERROR;

    _winston.default.error(err.stack);

    res.status(500).send(errorMsg); // res.render("error");
  }); // Assume 404 since no middleware responded

  app.use((req, res) => {
    console.log('request ' + req.path + ' not found');
    const notFound = _error.default.NOT_FOUND;
    res.status(404).send(notFound);
  }); // async function one() {
  //   const r = await Role.create({ name: 'admin' })
  //   const p = await Role.create({ name: 'moderator' })
  //   const q = await Role.create({ name: 'user' })
  // }
  // one()

  console.log('completed configuring express application');
  return app;
};

exports.start = start;