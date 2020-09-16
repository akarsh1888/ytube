"use strict";

var CartService = require("../services/cart_services");

var cartService = new CartService();

class CartController {
  async getCarts(req, res) {
    try {
      const data = await cartService.getCarts();
      return res.status(200).send({
        message: "CART ITEMS FETCHED SUCCESSFULLY",
        data
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async addToCart(req, res) {
    // http post
    try {
      const data = await cartService.addToCart(req.body);
      return res.status(200).send({
        message: "ADD TO CART STORED SUCCESSFULLY",
        data
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

}

module.exports = CartController;