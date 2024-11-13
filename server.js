const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults({
  static: "./build",
});
const PORT = process.env.PORT || 8000;

server.use(cors());
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server; // Export the server for Vercel
