const express = require('express')
const router = express.Router()
const AuthenticateController = require('../controllers/authenticate_controller')

router.post('/', AuthenticateController.store)

module.exports = router