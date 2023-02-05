const Router = require("express");
const router = new Router()
const {check} = require("express-validator")
const validate = require('../middlewares/validation.middleware')
const PostController = require('../controllers/post.controller')

router.post('/', [
    check('title', 'Title can not be empty').notEmpty(),
    check('content', 'Content can not be empty').notEmpty(),
], validate, PostController.create)

router.get('/', PostController.getAll)
router.get('/tag/:tagName', PostController.getByTag)
router.get('/:id', PostController.getOne)
router.delete('/:id', PostController.delete)

module.exports = router
