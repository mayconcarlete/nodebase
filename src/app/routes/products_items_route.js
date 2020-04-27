const express =require('express')
const router = express.Router()
const productsItemsController = require('../controllers/products_items_controller')

//   /productsitems //
router.post('/', productsItemsController.store)
router.get('/', productsItemsController.index)
router.get('/:id', productsItemsController.show)
router.put('/:id', productsItemsController.edit)
router.delete('/:id', productsItemsController.delete)

module.exports = router
