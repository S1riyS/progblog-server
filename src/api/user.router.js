const Router = require("express");
const router = new Router()
const UserController = require('../controllers/user.controller')

router.post('/', UserController.create)
router.get('/:id', UserController.getOne)

module.exports = router
