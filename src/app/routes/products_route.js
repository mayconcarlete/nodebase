const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const productsController = require('../controllers/products_controller')

router.post('/', AuthenticateService.isAdmin, productsController.store)

module.exports = router
