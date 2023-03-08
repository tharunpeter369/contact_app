
const express = require('express')
const app = express();
const contactRoute = require('./routes/contacts')
let port = 5000

app.use(express.json())

app.use('/api',contactRoute)

app.listen(port, () => {
    console.log(`backend server is running on port ${port}`);
})