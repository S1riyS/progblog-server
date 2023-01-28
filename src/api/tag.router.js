const Router = require("express");
const router = new Router()
const TagController = require('../controllers/tag.controller')

router.post('/', TagController.create)
router.get('/', TagController.getAll)
router.get('/:tagName', TagController.getOne)

module.exports = router