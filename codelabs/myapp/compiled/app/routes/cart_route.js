"use strict";

var express = require("express");

var router = express.Router();

var CartController = require("../controllers/cart_controller");

var cartController = new CartController();
router.get("/", (req, res) => cartController.getCarts(req, res)).post("/", (req, res) => cartController.addToCart(req, res));
module.exports = router;