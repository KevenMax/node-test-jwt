const express = require("express");
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json()); // Definindo o formato dos dados em JSON
  }

  routes() {
    this.express.use(require("./routes")); // Definindo arquivo de rotas
  }
}

module.exports = new App().express;
