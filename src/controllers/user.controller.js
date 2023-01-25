const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const generateJWT = require('../utils/generateJWT')
const UserService = require('../services/user.service')

class UserController {
    register = asyncHandler(async (req, res, next) => {
        try {
            const {email, password, name, bio} = req.body
            const {avatar} = req.files

            // Checking if user with given email is already exist
            UserService.retrieveOne({'email': email})
                .then(() => {
                    throw createError(400, 'User with this email is already exist')
                })
                .catch(() => {
                })

            // Hashing password
            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await UserService.create({
                email: email,
                password: hashedPassword,
                name: name,
                bio: bio,
                avatar: avatar
            })

            const token = generateJWT({id: user.dataValues.id, email: user.dataValues.email})
            res.status(200).json({token})

        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getOne = asyncHandler(async (req, res, next) => {
        try {
            const {id} = req.params
            const user = await UserService.retrieveOne({'id': id})
            res.status(200).json(user)
        } catch (e) {
            throw createError(400, e.message)
        }
    })

    getAll = asyncHandler(async (req, res, next) => {
        try {
            const users = await UserService.retrieveAll()
            res.status(200).json(users)
        } catch (e) {
            throw createError(400, e.message)
        }
    })
}

module.exports = new UserController()
