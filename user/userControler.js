const contacts = require("../db/contacts.json");

module.exports = class UserController {
  static listContacts(req, res, next) {
    res.status(200).json(contacts);
  }
};
