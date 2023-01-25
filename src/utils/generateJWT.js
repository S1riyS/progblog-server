const JWT = require('jsonwebtoken');

const config = require('../config');

module.exports = (payload) => {
    return JWT.sign(
        payload,
        config.jwt.secret_key,
        {expiresIn: config.jwt.expires_in},
    )
}