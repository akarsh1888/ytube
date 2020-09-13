const CartModel = require("../database/models/cart_model");
class CartServices {
  async getCarts() {
    return CartModel.find({});
  }

  async addToCart({ name, category, amount }) {
    const item = new CartModel();
    item.name = name;
    item.category = category;
    item.amount = amount;
    // returns a promise
    return item.save();
  }
}

module.exports = CartServices;
