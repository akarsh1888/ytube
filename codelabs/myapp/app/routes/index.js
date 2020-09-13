var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  // res.json({ key: "Iam also sending json" });
  // res.send("i can also send plain text");
  // res.status(484).json({ message: "iam sending json" });
  res.render("index", {
    title: "Cool, huh!",
    condition: true,
    anyArray: [1, 2, 3],
  });
});

module.exports = router;
