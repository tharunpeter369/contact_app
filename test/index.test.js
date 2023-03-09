var contactService = require('../services/contactServices')


// note: I dont have any previous experience with writing test cases

//jest test case

//get all
describe('contact service', () => {
    test('should return a list of contacts', async () => {
        const res = await contactService.getData();
        expect(res).toHaveLength(2);
    });
});

//create a new contact
describe('contact service', () => {
    let sample = {
        "firstName": "arshadh",
        "lastName": "k",
        "email": "tharun@gmail.com",
        "phone": "123456789",
        "address": "my address",
        "city": "kochi",
        "state": "kerala",
        "country": "India",
        "zipCode": "12345",
        "createdOn": "2023-03-08",
        "updatedOn": "2023-03-08"
    }
    test('should return created object', async () => {
        const res = await contactService.createData(sample);
        expect(res).toHaveProperty('firstName');
        expect(res).toHaveProperty('lastName');
    });
});


//get by id
describe('get data', () => {
    test('should return object', async () => {
        const res = await contactService.getDataById(1);
        expect(res).toHaveProperty('firstName');
        expect(res).toHaveProperty('lastName');
    });
});

//update contact
describe('get data', () => {
    let sample = {
        "firstName": "update",
        "lastName": "last name",
        "email": "tharun@gmail.com",
    }
    test('should return object', async () => {
        const res = await contactService.updateById(1, sample);
        expect(res).toHaveProperty('firstName');
    });
});


//get by id
describe('get data', () => {
    test('should return true or false', async () => {
        const res = await contactService.deleteById(2);
        expect(res).toBeTruthy()
    });
});