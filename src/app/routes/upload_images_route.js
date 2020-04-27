const express = require('express')
const router = express.Router()
const upload = require('../services/image-uploader/google-cloud-storage')
const uploadImagesController = require('../controllers/upload_images_controller')
const authenticateService = require('../middlewares/auth')
//router.post('/:category/:name', upload.multerMiddleware.array('file',3), uploadImagesController.store);
router.post('/:id',upload.multerMiddleware.array('files', 3), uploadImagesController.store)
router.post('/setprofileimage/:urlid', authenticateService.isAdmin,uploadImagesController.setIsProfile)//colocar proteção de admin

module.exports = router