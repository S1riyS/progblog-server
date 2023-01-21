const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')

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
// Load API api
app.use(config.api.prefix, routes);

module.exports = app
