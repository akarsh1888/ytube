"use strict";

const CartModel = require('../database/models/cart_model');

class CartServices {
  async getCarts() {
    return CartModel.find({});
  }

  async addToCart(cart) {
    // const item = new CartModel();
    // item.name = name;
    // item.category = category;
    // item.amount = amount;
    // returns a promise
    return CartModel.create(cart); // return item.save();
  }

}

module.exports = CartServices;