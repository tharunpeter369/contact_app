
const express = require('express')
const app = express();
const contactRoute = require('./routes/contacts')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./config/db')
let port = 5000

//error handling middleware
// app.use(notFound);
// app.use(errorHandler);

//application level middlewar
app.use(express.json())
app.use(cors())
dotenv.config()

// app.use(express.urlencoded({ extended: true }));
// app.use(logger);

// function logger(req, res, next) {
//   console.log(`${req.method} ${req.url}`);
//   next();
// }
db()

app.use('/api',contactRoute)

app.listen(port, () => {
    console.log(`backend server is running on port ${port}`);
})


// function notFound(req, res, next) {
//     const error = new Error(`Not found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
//   }
  
//   function errorHandler(error, req, res, next) {
//     const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
//     res.status(statusCode);
//     res.json({
//       message: error.message,
//       stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
//     });
//   }