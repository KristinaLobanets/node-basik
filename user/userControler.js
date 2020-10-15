const contacts = require("../db/contacts.json");
const Joi = require("joi");

module.exports = class UserController {
  static listContacts(req, res, next) {
    res.status(200).json(contacts);
  }

  static getById(req, res, next) {
    const id = Number(req.params.contactId);

    const user = contacts.find((item) => item.id === id);
    if (user === undefined) {
      res.status(404).send("Not found");
    }
    res.status(200).json(user);
  }

  static AddContact(req, res, next) {
    const newContact = { ...req.body, id: contacts.length + 1 };

    contacts.push(newContact);
    res.status(201).json(contacts);
  }

  static DeleteContact(req, res, next) {
    const id = Number(req.params.contactId);
    const userIndex = contacts.findIndex((item) => item.id === id);
    if (userIndex === -1) {
      res.status(404).send("Not found");
    }
    contacts.splice(userIndex, 1);
    res.status(200).send("contact deleted");
  }

  static updateContact(req, res, next) {
    const id = Number(req.params.contactId);
    const userIndex = contacts.findIndex((item) => item.id === id);
    if (userIndex === -1) {
      res.status(404).send("Not found");
    }
    contacts[userIndex] = { ...contacts[userIndex], ...req.body };
    res.status(200).json(contacts[userIndex]);
  }

  static validateAddContact(req, res, next) {
    const createValidationRules = Joi.object({
      nane: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const result = createValidationRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }

  static validateUpdateContact(req, res, next) {
    const createValidationRules = Joi.object({
      nane: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("Missing filds");
    }

    const result = createValidationRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }
};
