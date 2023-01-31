const Router = require("express");
const router = new Router()
const UserRouter = require('./user.router')
const PostRouter = require('./post.router')
const TagRouter = require('./tag.router')

router.use('/user', UserRouter)
router.use('/post', PostRouter)
router.use('/tag', TagRouter)

module.exports = router