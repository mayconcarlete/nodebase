const express = require('express')
const router = express.Router()
const AuthenticateService = require('../middlewares/auth')
const UserController = require('../controllers/user_controller')
const checkUserMiddleware = require('../helpers/check-user')
router.post('/', UserController.store)
router.put('/updateemail', AuthenticateService.authorize, checkUserMiddleware.checkUser , UserController.updateEmail)
router.put('/updatepassword', AuthenticateService.authorize, checkUserMiddleware.checkUser ,UserController.updatePassword)
router.put('/updatename', AuthenticateService.authorize, checkUserMiddleware.checkUser , UserController.updateName)
router.put('/updatephone', AuthenticateService.authorize,checkUserMiddleware.checkUser , UserController.updatePhone)
// router.put('/deleteuser', AuthenticateService.authorize, UserController.deleteUser)
// colocar como admin para pesquisa
router.post('/delete', AuthenticateService.authorize,checkUserMiddleware.checkUser, UserController.delete)
router.get('/:email', AuthenticateService.isAdmin ,UserController.show)

module.exports = router
