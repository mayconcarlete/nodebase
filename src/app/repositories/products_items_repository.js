const ProductsItems = require('../mongodb/models/ProductsItems')

class ProductsItemsRepository{
    async store(item){
        const newItem = await ProductsItems.create(item)
        return newItem
    }
    async index(){
        const productsItems = await ProductsItems.find()
        return productsItems
    }
    async show(id){
        const productItem = await ProductsItems.findOne({_id:id})
        return productItem
    }
    async edit(id, editedProductItem){
        const updatedProductItem= await ProductsItems.findOneAndUpdate({_id:id}, editedProductItem, {new:true})
        return updatedProductItem
    }
    async delete(id){
        const deletedpProductItem = await ProductsItems.findOneAndDelete({_id:id})
        return deletedpProductItem
    }
}

module.exports = new ProductsItemsRepository()