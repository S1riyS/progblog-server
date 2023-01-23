const uuid = require('uuid')
const path = require('path');
const {UserModel} = require('../models')

class UserService {
    async create(newUser) {
        console.log(newUser);
        try {
            let fileName = uuid.v4() + ".jpg"
            await newUser.avatar.mv(path.resolve(__dirname, '..', '..', 'static', fileName))

            return await UserModel.create({
                email: newUser.email,
                password: newUser.password,
                name: newUser.name,
                bio: newUser.bio,
                avatar: fileName
            })

        } catch (error) {
            console.log(error)
            throw new Error(`Error while creating user`)
        }
    }

    async retrieveOne(userId) {
        const user = await UserModel.findOne({
            where: {
                id: userId
            }
        }).catch((error) => {
            console.log(error)
            throw new Error(`Something went wrong`)
        })

        if (user === null) {
            throw new Error('User not found')
        }

        return user
    }

    async retrieveAll() {
        const users = await  UserModel.findAll({
            order: [['createdAt', 'DESC']],
        }).catch((error) => {
            console.log(error)
            throw new Error(`Something went wrong`)
        })

        if (users.length === 0) {
            throw new Error('Users not found')
        }

        return users
    }
}

module.exports = new UserService()