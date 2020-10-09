const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const { promises: fsPromise } = fs;

async function listContacts() {
  try {
    fs.readFile(contactsPath, "utf-8", (data) => {
      console.table(JSON.parse(data));
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === contactId);
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
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const idArray = listContacts.map((item) => item.id);
    const maxId = Math.max(...idArray);
    const id = maxId + 1;
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    console.log(newContact);
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
