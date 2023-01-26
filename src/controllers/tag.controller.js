const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const TagService = require('../services/tag.service')

class TagController {
    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {tagName} = req.params
            const tag =  await TagService.retrieveOne(tagName)
            res.status(200).json(tag)

        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getAll = asyncHandler(async (req, res, next) => {
        try {
            const tags = await TagService.retrieveAll()
            return res.status(200).json(tags)

        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new TagController()