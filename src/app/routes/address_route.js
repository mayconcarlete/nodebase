const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const AddressController = require('../controllers/address_controller')

router.post('/', AuthenticateService.authorize, AddressController.store)
router.get('/', AddressController.index)

module.exports = router
