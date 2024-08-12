const http = require("http");
const url = require("url");
const auth = require("./auth.js");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (path === "/register") {
    const response = auth.register(query.username, query.password);
    res.end(response);
  } else if (path === "/login") {
    const response = auth.login(query.username, query.password);
    res.end(response);
  } else {
    res.end("Invalid route!");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
