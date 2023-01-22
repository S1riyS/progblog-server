const UserService = require('../services/user.service')
const ApiError = require('../errors/apiError')

class UserController{
    async create(req, res, next) {
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
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()