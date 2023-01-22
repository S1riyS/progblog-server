const Router = require("express");
const router = new Router()
const UserController = require('../controllers/user.controller')

router.post('/', UserController.create)

module.exports = router
