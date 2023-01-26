const Router = require("express");
const router = new Router()
const TagController = require('../controllers/tag.controller')

router.get('/', TagController.getAll)
router.get('/:tagName', TagController.getOne)

module.exports = router