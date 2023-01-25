const Router = require("express");
const router = new Router()
const UserController = require('../controllers/user.controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)

module.exports = router
