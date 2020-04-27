const userRoute = require('./user_route')
const authenticateRoute = require('./authenticate_route')
const addressRoute = require('./address_route')
const productsRoute = require('./products_route')
const adminRoute = require('./admin_route')
const productsItems = require('./products_items_route')
const uploadImages = require('./upload_images_route')
const categoryRoute = require('./category_route')
module.exports = {
  userRoute,
  authenticateRoute,
  addressRoute,
  productsRoute,
  adminRoute,
  productsItems,
  uploadImages,
  categoryRoute
}
