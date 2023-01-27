const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const fileUpload = require('express-fileupload')

const config = require('./config')
const routes = require('./api')

const app = express()

// Allow Cross-Origin requests
app.use(cors());
// Set security HTTP headers
app.use(helmet());
// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());
// Transforms the raw string of req.body into json
app.use(express.json());
// Static content
app.use(express.static(path.resolve(__dirname, '..', 'static')))
// Allow receiving files
app.use(fileUpload({}))
// Load API
app.use(config.api.prefix, routes);
// Errors handler
app.use((error, req, res, next) => {
    // Sets HTTP status code
    res.status(error.status || 500)
    // Sends response
    res.json({
        status: error.status || 500,
        message: error.message,
    })
})

module.exports = app
