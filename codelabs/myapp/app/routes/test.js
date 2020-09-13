var express = require("express");
var router = express.Router();

router.post("/submit", function (req, res, next) {
  res.redirect("/parent/test/1");
});

router.get("/:id", function (req, res, next) {
  res.render("test", { output: req.params.id });
});

module.exports = router;
