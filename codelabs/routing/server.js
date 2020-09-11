var http = require("http");
var handleRequest = require("./handleRequest");

http
  .createServer(handleRequest.handleRequest)
  .listen(8000, () => console.log("iam listening 8000"));
