const express = require('express')
const router = express.Router()
const authenticateController = require('../controllers/authenticate_controller')

router.post('/', authenticateController.store)

module.exports = router