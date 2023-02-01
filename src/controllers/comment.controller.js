const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const CommentService = require('../services/comment.service')
const UserService = require('../services/user.service')
const PostService = require('../services/post.service')

class CommentController {
    create = asyncHandler(async (req, res, next) => {
        const {text, userId, postId} = req.body
        const processedText = text.trim()

        if (processedText === '') {
            throw createError(400, 'Comment can\'t be empty')
        }

        const authorExists = await UserService.checkUser({'id': userId})
        if (!authorExists) {
            throw createError(400, 'The user is specified incorrectly')
        }

        const postExists = await PostService.check({'id': postId})
        if (!postExists) {
            throw createError(400, 'The post is specified incorrectly')
        }

        try {
            const comment = await CommentService.create({
                text: processedText,
                userId: userId,
                postId: postId
            })
            res.status(200).json(comment)

        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new CommentController()