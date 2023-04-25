const router = require('express').Router();
const Joi = require('joi');
var jwt = require('jsonwebtoken');
var contactService = require('../services/contactServices')

// Contact object schema for validation using Joi
const contactSchema = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    zipCode: Joi.string(),
    createdOn: Joi.date(),
    updatedOn: Joi.date(),
});

const loginuser = "tharun"
const passwordUser = 12345

// router level middleware****************
// router.use(authenticate);

// function authenticate(req, res, next) {
//     //? Check if the user is authenticated
//     //? If not, return a 401 Unauthorized response
//     //? Otherwise, call next()
//     next();
//   }


//jwt token sign for createing Token with fixed loginuser and password for the test
const accesToken = jwt.sign({ username: loginuser, password: passwordUser }, "mySecretKey", { expiresIn: "10m" });


//verify jwt token
const verify = (req, res, next) => {
    const authHeader = req.headers.bearer
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                res.status(404).json("Token is invalid")
            } else {
                req.user = user;
                next();
            }
        })
    } else {

        ////////////////////////////////////////////////
        
        {/* if your not login then you can just uncoment below code for demo authentication */ }
        {/* if your login to get access token please comment below code */ }

        jwt.verify(accesToken, "mySecretKey", (err, user) => {
            if (err) {
                res.status(404).json("Token is invalid")
            } else {
                req.user = user;
                next();
            }
        })

        ////////////////////////////////////////////////
        // res.status(401).json("you are not authorized")
    }
}


//jwt authentication get by login
//use th access token get in response as header for authenticate API requests
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == loginuser && password == passwordUser) {
        res.json({ accesToken })
    } else {
        return res.status(400).json("username or password is incorrect")
    }
})


// getting all the contacts
// router.get("/contacts", verify,async (req, res) => {
router.get("/contacts", verify,async (req, res) => {
    let getContacts =await contactService.getData()
    res.status(200).send(getContacts);
})


//crearting new contacts
router.post('/contacts', verify, (req, res) => {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
        res.status(400).json({ status: 400, message: error.details.map((d) => d.message) });
    } else {
        let createContact = contactService.createData(value)
        res.status(200).send(createContact);
    }
});


//get the contacts by id
router.get('/contacts/:id', verify, (req, res) => {
    const id = parseInt(req.params.id);
    let getOne = contactService.getDataById(id)
    if (getOne) {
        res.status(200).send(getOne);
    } else {
        res.status(404).send('Contact not found');
    }
});

//update the contact by id
router.put('/contacts/:id', verify, (req, res) => {
    const id = parseInt(req.params.id);
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
        res.status(400).json({ status: 400, message: error.details.map((d) => d.message) });
    } else {
        let edit = contactService.updateById(id, value)
        if (edit) {
            res.status(200).send(edit);
        } else {
            res.status(404).send('Contact not found');
        }
    }
});

//delete contact by id
router.delete('/contacts/:id', verify, (req, res) => {
    const id = parseInt(req.params.id);
    const deleteById = contactService.deleteById(id)
    if (deleteById) {
        res.status(200).send('Contact deleted');
    } else {
        res.status(404).send('Contact not found');
    }
});


module.exports = router