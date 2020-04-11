const Products = require('../mongodb/models/Products')

class ProductsRepository{
    store = async (product) => {
        const newProduct = await Products.create(product)
        return newProduct
    }
}

module.exports = new ProductsRepository()