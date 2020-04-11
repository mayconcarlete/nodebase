const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const productsController = require('../controllers/products_controller')
const checkProductMiddleware = require('../helpers/check-products')

router.post('/', AuthenticateService.isAdmin,checkProductMiddleware.checkProducts, productsController.store)

module.exports = router
