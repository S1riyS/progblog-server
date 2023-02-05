const asyncHandler = require('express-async-handler')
const ApiError = require('../errors/apiError')
const TagService = require('../services/tag.service')

class TagController {
    create = asyncHandler(async (req, res, next) => {
        const {name, description} = req.body

        const candidate = await TagService.check(name)
        if (candidate) {
            throw ApiError.badRequest('Tag with this name is already exist')
        }

        try {
            const tag = await TagService.create({
                name: name,
                description: description
            })
            res.status(200).json(tag)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {tagName} = req.params
            const tag =  await TagService.retrieveOne(tagName)
            res.status(200).json(tag)

        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    getAll = asyncHandler(async (req, res, next) => {
        try {
            const tags = await TagService.retrieveAll()
            return res.status(200).json(tags)

        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })
}

module.exports = new TagController()