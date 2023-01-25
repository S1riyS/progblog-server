const Router = require("express");
const router = new Router()
const authMiddleware = require('../middlewares/auth.middleware')
const UserController = require('../controllers/user.controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)

module.exports = router
