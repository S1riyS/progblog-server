const jwt = require('jsonwebtoken')
const ApiError = require('../errors/apiError')
const config = require('../config')

function checkToken(token) {
    if (!token) {
        throw ApiError.authRequired('Not authorized')
    }
}

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer *token*
        checkToken(token)

        req.user = jwt.verify(token, config.jwt.secret_key)
        next()
    } catch (e) {
        throw ApiError.authRequired('Not authorized')
    }
};