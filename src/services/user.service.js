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

        } catch (e) {
            throw new Error(`Error while create user: ${e.message}`)
        }
    }
}

module.exports = new UserService()