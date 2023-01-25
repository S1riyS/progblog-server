const uuid = require('uuid')
const path = require('path');
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const generateJWT = require('../utils/generateJWT')
const UserService = require('../services/user.service')
const {reject} = require("bcrypt/promises");

class UserController {
    register = asyncHandler(async (req, res, next) => {
        const {email, password, name, bio} = req.body
        const {avatar} = req.files
        if (!email || !password) {
            throw createError(400, 'Incorrect email or password')
        }

        await UserService.retrieveOne({'email': email})
            .then(() => {
                throw createError(400, 'User with this email is already exist')
            })
            .catch(() => {})

        // Saving profile picture to static
        let fileName = uuid.v4() + ".jpg"
        await avatar.mv(path.resolve(__dirname, '..', '..', 'static', fileName))

        // Hashing password
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserService.create({
            email: email,
            password: hashedPassword,
            name: name,
            bio: bio,
            avatar: fileName
        })

        const token = generateJWT({id: user.dataValues.id, email: user.dataValues.email})
        res.status(200).json({token})
    })

    login = asyncHandler(async (req, res, next) => {
        const {email, password} = req.body
        const user = await UserService.retrieveOne({'email': email})
            .catch(() => {
                throw createError(400, 'Wrong email or password')
            })

        let comparePassword = bcrypt.compareSync(password, user.dataValues.password)
        if (!comparePassword) {
            throw createError(400, 'Wrong email or password')
        }

        const token = generateJWT({id: user.dataValues.id, email: user.dataValues.email})
        return res.status(200).json({token})
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
