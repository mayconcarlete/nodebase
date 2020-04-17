const userRoute = require('./user_route')
const authenticateRoute = require('./authenticate_route')
const addressRoute = require('./address_route')
const productsRoute = require('./products_route')
const adminRoute = require('./admin_route')
const uploadImages = require('./upload_images_route')
module.exports = {
  userRoute,
  authenticateRoute,
  addressRoute,
  productsRoute,
  adminRoute,
  uploadImages
}
