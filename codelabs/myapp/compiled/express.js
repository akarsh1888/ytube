"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _error = _interopRequireDefault(require("./config/error.messages"));

var _index = _interopRequireDefault(require("./app/routes/index"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _parent = _interopRequireDefault(require("./app/routes/parent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = require('winston');

var hbs = require('express-handlebars');

var path = require('path');

const start = () => {
  // Initialize express app
  var app = (0, _express.default)(); // *******************************
  // Server  Side Template Engine Setup
  // view engine setup

  app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, '/app/views/layouts/')
  })); // path to the directory where all views are saved

  app.set('views', path.join(__dirname, '/app', 'views')); // other engines also available :: 1) hbs (handlebars) 2) jade  3)pug

  app.set('view engine', 'hbs'); // Showing stack errors

  app.set('showStackError', true); // CookieParser should be above session

  app.use((0, _cookieParser.default)());
  /**************
  MIddleware for transforming request,authentication,validation,
   */
  // Request body parsing middleware should be above methodOverride

  app.use((0, _bodyParser.json)({
    type: 'application/*',
    limit: '30mb'
  })); // for using query string in the URL

  app.use((0, _bodyParser.urlencoded)({
    extended: true
  })); // for cross domain communication from browser

  app.use((0, _cors.default)()); // for logging out

  app.use((0, _morgan.default)('dev'));
  app.use((0, _methodOverride.default)()); //   app.use(express.static(path.join(__dirname + "/app", "public")));
  // Use helmet to secure Express headers
  //   app.use(helmet.xframe());
  //   app.use(helmet.xssFilter());
  //   app.use(helmet.nosniff());
  //   app.use(helmet.ienoopen());

  app.disable('x-powered-by');
  /*
  //************* Middlewares has to be wrote before going to server routing/controlling program 
  but has power to behave as a controller ie. sometimes they have to response to client there only without 
  going to the next middleware...
  but should be avoided, they should not response any data
  */

  const somemiddleman = (req, res, next) => {
    console.log('Pass through me baby');
    /**
     * If error not handled properly */
    // throw new Error("app will crash");

    /*
     * Sharing data between middlewares */
    // attaching to request object
    // req.data = "Some data";

    next();
  };
  /* middlewares registerd on the routes */


  app.use('/', [somemiddleman], (req, res, next) => {
    // res.send({ message: req.data });
    next();
  });
  app.use('/', _index.default);
  app.use('/api', _parent.default);
  /***
   * When we call next() function on a middleware control passes to another middleware
   *   ie. here in this case, controller written above are passing to these below error handlers
   *   middleware if it any occurs
   *
   */
  // error handler middleware if error occurs from the controller

  app.use(function (err, req, res, next) {
    let errorMsg;

    if (err.name === 'SyntaxError' && err.message.indexOf('Unexpected') >= 0) {
      errorMsg = _error.default.UNPARSABLE_REQUEST;
      res.status(400).send(errorMsg); //   res.render("error");

      return;
    }

    errorMsg = _error.default.SERVER_ERROR;
    logger.error(err.stack);
    res.status(500).send(errorMsg); // res.render("error");
  }); // Assume 404 since no middleware responded

  app.use((req, res) => {
    console.log('request ' + req.path + ' not found');
    const notFound = _error.default.NOT_FOUND;
    res.status(404).send(notFound);
  });
  /************************************
   * 88888 */

  console.log('completed configuring express application');
  return app;
};

exports.start = start;