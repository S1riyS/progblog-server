const {UserModel} = require('../models')

class UserService {
    async create(newUser) {
        return await UserModel
            .create({
                email: newUser.email,
                password: newUser.password,
                name: newUser.name,
                bio: newUser.bio,
                avatar: newUser.avatar
            })
            .catch((error) => {
                console.log(error)
                throw new Error(`Error while creating user`)
            })
    }

    async check(searchParams) {
        // True if user with given params exist, false if it doesn't
        const user = await UserModel.findOne({
            where: searchParams
        })

        return user !== null
    }

    async retrieveOne(searchParams) {
        const user = await UserModel
            .findOne({where: searchParams})
            .catch((error) => {
                console.log(error)
                throw new Error(`Something went wrong`)
            })

        if (user === null) {
            throw new Error('User not found')
        }

        return user
    }

    async retrieveAll() {
        const users = await UserModel
            .findAll({order: [['createdAt', 'DESC']]})
            .catch((error) => {
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