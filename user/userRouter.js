const { Router } = require("express");
const UserController = require("./userControler");

const UserRouter = Router();

UserRouter.get("/contacts", UserController.listContacts);
module.exports = UserRouter;
