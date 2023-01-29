const Router = require("express");
const router = new Router()
const PostController = require('../controllers/post.controller')

router.post('/', PostController.create)
router.get('/', PostController.getAll)
router.get('/tag/:tagName', PostController.getByTag)
router.get('/:id', PostController.getOne)
router.delete('/:id', PostController.delete)

module.exports = router
