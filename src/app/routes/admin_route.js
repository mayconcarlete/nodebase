const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin_controller')
const authenticateService = require('../middlewares/auth')

router.post('/', authenticateService.isAdmin, adminController.store)

module.exports = router