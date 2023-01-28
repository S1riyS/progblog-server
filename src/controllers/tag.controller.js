const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const TagService = require('../services/tag.service')

class TagController {
    create = asyncHandler(async (req, res, next) => {
        const {name, description} = req.body

        const candidate = await TagService.check(name)
        if (candidate) {
            throw createError(400, 'Tag with this name is already exist')
        }

        try {
            const tag = await TagService.create({
                name: name,
                description: description
            })
            res.status(200).json(tag)
        } catch (e) {
            throw createError(400, e.message)
        }
    })

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