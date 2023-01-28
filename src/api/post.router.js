const Router = require("express");
const router = new Router()
const PostController = require('../controllers/post.controller')

router.post('/', PostController.create)
router.get('/:id', PostController.getOne)

module.exports = router
