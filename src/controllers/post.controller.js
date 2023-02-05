const uuid = require('uuid')
const path = require('path');
const asyncHandler = require('express-async-handler')
const ApiError = require('../errors/apiError')
const UserService = require('../services/user.service')
const TagService = require('../services/tag.service')
const PostService = require('../services/post.service')
const PostTagService = require('../services/posttag.service')


class PostController {
    create = asyncHandler(async (req, res, next) => {
        const {title, content, userId, tagNames} = req.body
        const {banner} = req.files
        const tags = tagNames.split(',').map((item) => item.trim());

        // Saving banner to static
        let bannerFileName = uuid.v4() + ".jpg"
        await banner.mv(path.resolve(__dirname, '..', '..', 'static', bannerFileName))

        // Checking tags
        if (tags.length > 5) {
            throw ApiError.badRequest('The maximum number of tags is 5')
        }

        // Validating user
        const author = await UserService.check({'id': userId})
        if (!author) {
            throw ApiError.badRequest('The user is specified incorrectly')
        }

        try {
            const post = await PostService.create({
                banner: bannerFileName,
                title: title,
                content: content,
                userId: userId
            })

            let postTagRelationships = []
            for (const tagName of tags) {
                const tag = await TagService.retrieveOne(tagName)
                if (tag) {
                    postTagRelationships.push({
                        PostId: post.dataValues.id,
                        TagId: tag.dataValues.id
                    })
                }
            }
            await PostTagService.bulkCreate(postTagRelationships);

            res.status(200).json(post)

        } catch (e) {
            throw ApiError.badRequest(e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const post = await PostService.retrieveOne(id)
            await PostService.incrementViews(id)
            res.status(200).json(post)

        } catch (e) {
            throw ApiError.badRequest(e.message)
        }
    })

    getAll = asyncHandler(async (req, res, next) => {
        try {
            const posts = await PostService.retrieveAll()
            res.status(200).json(posts)

        } catch (e) {
            throw ApiError.badRequest(e.message)
        }
    })

    getByTag = asyncHandler(async (req, res, next) => {
        try {
            const {tagName} = req.params
            const posts = await PostService.retrieveAll(tagName)
            res.status(200).json(posts)

        } catch (e) {
            throw ApiError.badRequest(e.message)
        }
    })

    delete = asyncHandler(async  (req, res, next) => {
        try {
            const {id} = req.params
            await PostTagService.delete(id)
            const serviceResponse = await PostService.delete(id)
            res.status(200).json(serviceResponse)
        } catch (e) {
            throw ApiError.badRequest(e.message)
        }
    })
}

module.exports = new PostController()
