const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const UserService = require('../services/user.service')

class UserController {
    create = asyncHandler(async (req, res, next) => {
        try {
            const newUser = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                bio: req.body.bio,
                avatar: req.files.avatar
            }
            const user = await UserService.create(newUser)
            res.status(200).json(user)
        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const user = await UserService.retrieveOne(id)
            res.status(200).json(user)
        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getAll = asyncHandler(async  (req, res, next) => {
        try {
            const users = await UserService.retrieveAll()
            res.status(200).json(users)
        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new UserController()
