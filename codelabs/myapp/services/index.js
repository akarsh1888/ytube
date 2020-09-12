// This represents our UserModel
const UserModel = require("../database/models/user_model");

// var akarsh = new UserModel({
//   username: "akarsh",
//   email: "akarsh1888@gmail.com",
//   host: "MC",
// });
// akarsh.save().then((e) => console.log("saved"));

class RootService {
  // it returns a promise
  getUsers() {
    return UserModel.find({});
  }

  async createUser({ email, username, host }) {
    const user = new UserModel();
    user.username = username;
    user.email = email;
    user.host = host;
    // returns a promise
    return user.save();
  }

  getUserByEmail(emailInfo) {
    return UserModel.find({ email: emailInfo });
  }
  removeUserByEmail(emailInfo) {
    return UserModel.findOneAndRemove({ email: emailInfo });
  }
  // we r sorting & returning the data on the basis of "email" attribute
  filterUserByEmail() {
    return UserModel.find({});
  }
}

module.exports = RootService;
