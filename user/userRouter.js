const { Router } = require("express");
const UserController = require("./userControler");

const UserRouter = Router();

UserRouter.get("/contacts", UserController.listContacts);

UserRouter.get("/contacts/:contactId", UserController.getById);

UserRouter.post(
  "/contacts",
  UserController.validateAddContact,
  UserController.AddContact
);

UserRouter.delete("/contacts/:contactId", UserController.DeleteContact);

UserRouter.patch(
  "/contacts/:contactId",
  UserController.validateUpdateContact,
  UserController.updateContact
);

module.exports = UserRouter;
