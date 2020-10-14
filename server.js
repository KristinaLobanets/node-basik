const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const UserRouter = require("./user/userRouter");

require("dotenv").config();

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.server.use(cors({ origin: `http://localhost:${process.env.PORT}` }));
  }

  initRoutes() {
    this.server.use("/api", UserRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Started Port:", process.env.PORT);
    });
  }
};
