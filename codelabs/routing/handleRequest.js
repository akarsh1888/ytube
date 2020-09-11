var url = require("url");
var fs = require("fs");

function render(filePath, res) {
  fs.readFile(filePath, null, (err, data) => {
    if (err) {
      res.writeHead(484);
      res.write("request file not present");
    } else {
      res.write(data);
    }
    res.end();
  });
}

module.exports = {
  handleRequest: (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    switch (url.parse(req.url).pathname) {
      case "/":
        render("./index.txt", res);
        break;
      case "/login":
        render("./login.txt", res);
        break;
      default:
        res.writeHead(484);
        res.write("request url not valid");
        res.end();
    }
  },
};
