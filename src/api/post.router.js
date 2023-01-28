const Router = require("express");
const router = new Router()
const PostController = require('../controllers/post.controller')

router.post('/', PostController.create)

module.exports = router
