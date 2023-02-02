const Router = require("express");
const router = new Router()
const authMiddleware = require('../middlewares/auth.middleware')
const CommentController = require('../controllers/comment.controller')

router.post('/', authMiddleware, CommentController.create)
router.get('/:id', CommentController.getOne)
router.get('/post/:postId', CommentController.getByPost)
router.get('/user/:userId', CommentController.getByUser)
router.delete('/:id', CommentController.delete)

module.exports = router
