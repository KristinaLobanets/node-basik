const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const { promises: fsPromise } = fs;

async function listContacts() {
  try {
    const res = await fsPromise.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(res));
    return JSON.parse(res);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const findId = contactsList.find((contact) => contact.id === contactId);
    console.table(findId);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const filteredList = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromise.writeFile(contactsPath, JSON.stringify(filteredList));
    await listContacts();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const idArray = contactsList.map((item) => item.id);
    const maxId = Math.max(...idArray);
    const id = maxId + 1;
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    await listContacts();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
