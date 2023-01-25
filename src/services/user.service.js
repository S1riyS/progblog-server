const createError = require('http-errors')
const {UserModel} = require('../models')

class UserService {
    async create(newUser) {
        console.log(newUser);
        try {
            return await UserModel.create({
                email: newUser.email,
                password: newUser.password,
                name: newUser.name,
                bio: newUser.bio,
                avatar: newUser.avatar
            })

        } catch (error) {
            console.log(error)
            throw createError(`Error while creating user`)
        }
    }

    async retrieveOne(params) {
        const user = await UserModel.findOne({
            where: params
        }).catch((error) => {
            console.log(error)
            throw createError(`Something went wrong`)
        })

        if (user === null) {
            throw createError('User not found')
        }

        return user
    }

    async retrieveAll() {
        const users = await  UserModel.findAll({
            order: [['createdAt', 'DESC']],
        }).catch((error) => {
            console.log(error)
            throw createError(`Something went wrong`)
        })

        if (users.length === 0) {
            throw createError('Users not found')
        }

        return users
    }
}

module.exports = new UserService()