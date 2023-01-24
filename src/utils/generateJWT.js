const JWT = require('jsonwebtoken');
const createError = require('http-errors')

const config = require('../config');

module.exports = (payload) => {
    JWT.sign(
        payload,
        config.jwt.secret_key,
        {expiresIn: config.jwt.expires_in},
        (error, token) => {
            if (error) {
                throw createError(500, 'Failed to create JWT token')
            }
            return {token: token}
        }
    )
}