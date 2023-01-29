const uuid = require('uuid')
const path = require('path');
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
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
            throw createError(400, 'The maximum number of tags is 5')
        }

        // Validating user
        const author = await UserService.checkUser({'id': userId})
        if (!author) {
            throw createError(400, 'The user is specified incorrectly')
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
            throw createError(400, e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const post = await PostService.retrieveOne(id)
            res.status(200).json(post)

        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getAll = asyncHandler(async (req, res, next) => {
        try {
            const posts = await PostService.retrieveAll()
            res.status(200).json(posts)

        } catch (e) {
            throw createError(400, e.message)
        }
    })

    delete = asyncHandler(async  (req, res, next) => {
        try {
            const {id} = req.params
            await PostService.delete(id)
            await PostTagService.delete(id)
            res.status(200).json({message: 'Post deleted'})
        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new PostController()
