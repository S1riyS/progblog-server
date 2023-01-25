const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const TagService = require('../services/tag.service')

class TagController {
    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {tagName} = req.params
            return await TagService.retrieveOne(tagName)
        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new TagController()