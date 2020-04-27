const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category_controller')

router.post('/', categoryController.store)
router.get('/', categoryController.index)
router.get('/:id', categoryController.show)
router.put('/:id', categoryController.edit)
router.delete('/:id', categoryController.delete)

module.exports = router