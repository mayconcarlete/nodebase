const express = require('express')
const router = express.Router()
const adicionaisProductsController = require('../controllers/adicionais_products_controller')
const authenticateService = require('../middlewares/auth')
router.post('/',adicionaisProductsController.store)
router.get('/', adicionaisProductsController.index )
module.exports = router