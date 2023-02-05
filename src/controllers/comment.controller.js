const asyncHandler = require('express-async-handler')
const ApiError = require('../errors/apiError')
const CommentService = require('../services/comment.service')
const UserService = require('../services/user.service')
const PostService = require('../services/post.service')

class CommentController {
    create = asyncHandler(async (req, res, next) => {
        const {text, userId, postId} = req.body
        const processedText = text.trim()

        const authorExists = await UserService.check({'id': userId})
        if (!authorExists) {
            throw ApiError.badRequest('The user is specified incorrectly')
        }

        const postExists = await PostService.check({'id': postId})
        if (!postExists) {
            throw ApiError.badRequest('The post is specified incorrectly')
        }

        try {
            const comment = await CommentService.create({
                text: processedText,
                userId: userId,
                postId: postId
            })
            res.status(200).json(comment)

        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const comment = await CommentService.retrieveOne(id)
            res.status(200).json(comment)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    getByPost = asyncHandler(async (req, res, next) => {
        try {
            const {postId} = req.params
            const comments = await CommentService.retrieveAll({'$Post.id$': postId})
            res.status(200).json(comments)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    getByUser = asyncHandler(async (req, res, next) => {
        try {
            const {userId} = req.params
            const comments = await CommentService.retrieveAll({'$User.id$': userId})
            res.status(200).json(comments)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })

    delete = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const serviceResponse = await CommentService.delete(id)
            res.status(200).json(serviceResponse)
        } catch (e) {
            throw ApiError.internal(e.message)
        }
    })
}

module.exports = new CommentController()