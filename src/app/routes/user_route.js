const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const UserController = require('../controllers/user_controller')

router.post('/', UserController.store)
router.put('/updateemail', AuthenticateService.authorize, UserController.updateEmail)
// colocar como admin para pesquisa
router.get('/:email', UserController.show)

module.exports = router
