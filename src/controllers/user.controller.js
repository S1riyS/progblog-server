const UserService = require('../services/user.service')

class UserController {
    async create(req, res) {
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
            res.status(404).json({status: 400, message: e.message})
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params
            const user = await UserService.retrieveOne(id)
            res.status(200).json(user)
        } catch (e) {
            res.status(404).json({status: 400, message: e.message})
        }
    }
}

module.exports = new UserController()
