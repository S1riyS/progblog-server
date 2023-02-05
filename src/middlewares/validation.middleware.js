const {validationResult} = require('express-validator')
const ApiError = require('../errors/apiError')

function processValidationErrors(errors) {
    let messages = []
    for (item of errors.errors) {
        messages.push(item.msg)
    }

    return messages.join('; ')
}

module.exports = function (req, res, next) {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const message = processValidationErrors(validationErrors)
        next(ApiError.badRequest(message))
    } else {
        next()
    }
}