const {validationResult} = require('express-validator')

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
        res.status(400).json({status: 400, message: message})
    } else {
        next()
    }
}