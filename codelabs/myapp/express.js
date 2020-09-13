import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import errorMessages from "./config/error.messages";
var logger = require("winston");
var hbs = require("express-handlebars");
var path = require("path");
var indexRouter = require("./app/routes/index");
var parentRouter = require("./app/routes/parent");

export default () => {
  // Initialize express app
  var app = express();

  // *******************************
  // Server  Side Template Engine Setup

  // view engine setup
  app.engine(
    "hbs",
    hbs({
      extname: "hbs",
      defaultLayout: "layout",
      layoutsDir: __dirname + "/app/views/layouts/",
    })
  );
  // path to the directory where all views are saved
  app.set("views", path.join(__dirname + "/app", "views"));
  // other engines also available :: 1) hbs (handlebars) 2) jade  3)pug
  app.set("view engine", "hbs");

  // Showing stack errors
  app.set("showStackError", true);

  // CookieParser should be above session
  app.use(cookieParser());

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.json({ type: "application/*", limit: "30mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  //   app.use(express.static(path.join(__dirname + "/app", "public")));

  // Use helmet to secure Express headers
  //   app.use(helmet.xframe());
  //   app.use(helmet.xssFilter());
  //   app.use(helmet.nosniff());
  //   app.use(helmet.ienoopen());
  //   app.disable("x-powered-by");

  app.use("/api", indexRouter);
  app.use("/api/parent", parentRouter);

  // error handler if error occurs from the controller
  app.use(function (err, req, res, next) {
    let errorMsg;
    if (err.name === "SyntaxError" && err.message.indexOf("Unexpected") >= 0) {
      errorMsg = errorMessages.UNPARSABLE_REQUEST;
      res.status(400).send(errorMsg);
      //   res.render("error");
      return;
    }
    errorMsg = errorMessages.SERVER_ERROR;
    logger.error(err.stack);
    res.status(500).send(errorMsg);
    // res.render("error");
  });
  // Assume 404 since no middleware responded
  app.use((req, res) => {
    console.log("request " + req.path + " not found");
    const notFound = errorMessages.NOT_FOUND;
    res.status(404).send(notFound);
  });
  console.log("completed configuring express application");
  return app;
};
