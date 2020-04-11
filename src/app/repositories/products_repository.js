const Products = require('../mongodb/models/Products')

class ProductsRepository{
    store = async (product) => {
        const newProduct = await Products.create(product)
        return newProduct
    }
    show= async(productId)=>{
        const product = await Products.findOne(productId)
        return product
    }
    index = async ()=>{
        const products = await Products.find()
        return products
    }
}

module.exports = new ProductsRepository()