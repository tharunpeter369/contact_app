
//dummy data
const contacts = [
    {
        id: 1,
        firstName: "tharun",
        lastName: "peter",
        email: "tharun@gmail.com",
        phone: "123456789",
        address: "my address",
        city: "kochi",
        state: "kerala",
        country: "India",
        zipCode: "12345",
        createdOn: new Date(),
        updatedOn: new Date(),
    },
    {
        id: 2,
        firstName: "Midhun",
        lastName: "Mohanan",
        email: "midhun@gmail.com",
        phone: "123456789",
        address: "my address",
        city: "kochi",
        state: "kerala",
        country: "India",
        zipCode: "12345",
        createdOn: new Date(),
        updatedOn: new Date(),
    }
];

const Contact = require('./schema/contact.model')


module.exports = {

    async getData() {
        let data = await Contact.find()
        return data
        // return contacts
    },

    createData(body) {
        const { firstName, lastName, email, address, city, state, country, zipCode, createdOn, updatedOn } = body;
        const newContact = { id: contacts.length + 1, firstName, lastName, email, address, city, state, country, zipCode, createdOn, updatedOn };
        contacts.push(newContact);
        return newContact;
    },

    getDataById(id) {
        return contacts.find(c => c.id === id);
    },

    updateById(id, value) {
        let contact = contacts.find(c => c.id === id);
        if (!contact) {
            return false;
        } else {
            const updatedContact = { ...contact, ...value, updatedOn: new Date() };
            contact = updatedContact
            return contact;
        }
    },

    deleteById(id) {
        const index = contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            contacts.splice(index, 1);
            return true;
        } else {
            return false;
        }
    },

}