const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const MONGO_URL = process.env.DB_URI
const db = async () => {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('MongoDB database connected successfully.')
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB database:', err)
        })
}

module.exports = db