let users = [
  { username: "Akarsh", email: "akarsh1888@gmail.com" },
  { username: "1", email: "a" },
  { username: "2", email: "b" },
];

class RootService {
  getUsers() {
    return users;
  }

  createUser(userInfo) {
    users.push(userInfo);
    return users;
  }

  getUserByEmail(emailInfo) {
    return users.find((user) => user.email === emailInfo);
  }
  removeUserByEmail(emailInfo) {
    var s = String(emailInfo);
    var data = users.filter((user) => user.email !== s);
    users = [...data];
    return data;
  }
}

module.exports = RootService;
