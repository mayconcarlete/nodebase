const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const UserController = require('../controllers/user_controller')

router.post('/', UserController.store)
router.put('/updateemail', AuthenticateService.authorize, UserController.updateEmail)
router.put('/updatepassword', AuthenticateService.authorize, UserController.updatePassword)
router.put('/updatename', AuthenticateService.authorize, UserController.updateName)
router.put('/updatephone', AuthenticateService.authorize, UserController.updatePhone)
// router.put('/deleteuser', AuthenticateService.authorize, UserController.deleteUser)
// colocar como admin para pesquisa
router.get('/:email', UserController.show)

module.exports = router
