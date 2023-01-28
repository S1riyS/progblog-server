const uuid = require('uuid')
const path = require('path');
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const TagService = require('../services/tag.service')
const PostService = require('../services/post.service')
const PostTagService = require('../services/posttag.service')


class PostController {
    create = asyncHandler(async (req, res, next) => {
        const {banner, title, content, userId, tags} = req.body

        // Saving banner to static
        let bannerFileName = uuid.v4() + ".jpg"
        await banner.mv(path.resolve(__dirname, '..', '..', 'static', bannerFileName))

        if (tags.length > 5) {
            throw createError(400, 'The maximum number of tags is 5')
        }

        try {
            const post = await PostService.create({
                banner: bannerFileName,
                title: title,
                content: content,
                userId: userId
            })

            let postTagRelationships = []
            for (const tag of tags) {
                const tag = await TagService.retrieveOne(tag)
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
}

module.exports = new PostController()
