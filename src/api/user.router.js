const Router = require("express");
const router = new Router()
const {check} = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware')
const validate = require('../middlewares/validation.middleware')
const UserController = require('../controllers/user.controller')

router.post('/register', [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimal length of password is 4').isLength({min: 4}),
    check('name', 'Name can not be empty').notEmpty(),
], validate, UserController.register)

router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)
router.get('/', UserController.getAll)
router.get('/:id', UserController.getOne)

module.exports = router
