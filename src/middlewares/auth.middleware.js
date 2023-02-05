const jwt = require('jsonwebtoken')
const ApiError = require('../errors/apiError')
const config = require('../config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    const token = req.headers.authorization.split(' ')[1] // Bearer *token*
    if (!token) {
        throw ApiError.authRequired('Not authorized')
    }

    try {
        req.user = jwt.verify(token, config.jwt.secret_key)
        next()
    } catch (e) {
        throw ApiError.authRequired('Not authorized')
    }
};