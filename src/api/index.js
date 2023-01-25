const Router = require("express");
const router = new Router()
const UserRouter = require('./user.router')
const TagRouter = require('./tag.router')

router.use('/user', UserRouter)
router.use('/tag', TagRouter)

module.exports = router