const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const productsController = require('../controllers/products_controller')
const checkProductMiddleware = require('../helpers/check-products')

router.get('/', productsController.index)
router.get('/:id', productsController.show)
router.post('/', productsController.store)
module.exports = router
