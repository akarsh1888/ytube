"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var router = (0, _express.Router)();
/* GET home page. */

router.get('/', function (req, res, next) {
  // res.render("index", { title: "Express" });
  // res.json({ key: "Iam also sending json" });
  // res.send("i can also send plain text");

  /*
  // this will end the response no message  or data will be shown to the client
  res.end()
  // this is for sending status code
  res.status(404) 
  
  res.status(404).json({ message: 'not found' })
  
  */
  res.render('index', {
    title: 'Cool, huh!',
    condition: true,
    anyArray: [1, 2, 3]
  });
});
router.post('/', function (req, res, next) {
  res.redirect('/1');
});
router.get('/:id', function (req, res, next) {
  res.render('test', {
    output: req.params.id
  });
});
var _default = router;
exports.default = _default;