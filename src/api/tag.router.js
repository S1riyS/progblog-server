const Router = require("express");
const router = new Router()
const {check} = require("express-validator")
const validate = require('../middlewares/validation.middleware')
const TagController = require('../controllers/tag.controller')

router.post('/', [
    check('name', 'Tag name can not be empty').notEmpty(),
    check('description', 'Tag description can not be empty').notEmpty()
], validate, TagController.create)

router.get('/', TagController.getAll)
router.get('/:tagName', TagController.getOne)

module.exports = router