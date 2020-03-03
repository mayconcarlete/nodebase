const router = require('express').Router()
const addressController = require('../controllers/address_controller')
const authMiddleware = require('../middlewares/auth')

router.post('/', authMiddleware, addressController.store)

module.exports = router