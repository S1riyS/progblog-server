const path = require('path')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const fileUpload = require('express-fileupload')

const config = require('./config')
const apiRoutes = require('./api')
const database = require("./config/db.config");
const ErrorsHandler = require("./middlewares/errorsHandler.middleware");


class Application {
    constructor() {
        this.app = express()
        this.config = config
        this.db = database
    }

    setupDatabase = async () => {
        await this.db.authenticate()
        await this.db
            .sync({alter: true})
            .then(() => {
                console.log('Connection with database established successfully');
            })
            .catch(() => {
                console.log('Some errors have occurred during establishing connection with database');
            })
    }

    setupExpress = async () => {
        // Allow Cross-Origin requests
        this.app.use(cors());
        // Set security HTTP headers
        this.app.use(helmet());
        // Data sanitization against XSS(clean user input from malicious HTML code)
        this.app.use(xss());
        // Transforms the raw string of req.body into json
        this.app.use(express.json());
        // Static content
        this.app.use(express.static(path.resolve(__dirname, '..', 'static')))
        // Allow receiving files
        this.app.use(fileUpload({}))
        // Load API
        this.app.use(this.config.api.prefix, apiRoutes);
        // Errors handler
        this.app.use(ErrorsHandler.handle())
    }

    setupServer = async () => {
        this.app.listen(this.config.port, () => {
            console.log(`Application is running on port ${this.config.port}`)
        })
    }
}

module.exports = new Application()
