const Products = require('../mongodb/models/Products')

class ProductsRepository{
    store = async (product) => {
        const newProduct = await Products.create(product)
        return newProduct
    }
    show= async(productId)=>{
        const product = await Products.findOne({_id:productId})
        return product
    }
    index = async ()=>{
        const products = await Products.find()
        return products
    }
    uploadImage = async(id, urlArr) =>{
        const productImages = await Products.findOneAndUpdate({_id:id},{
            urlArr
        }, {new:true})
        return productImages
    }
    getProfileData = async(urlid) =>{
        console.log(`Cheguei aqui`)
        const product1 = await Products.findOneAndUpdate({"urlArr._id":urlid},{$set:{"urlArr.$[].isProfile":false}},{new:true})
        const product = await Products.findOneAndUpdate({"urlArr._id":urlid},{$set:{"urlArr.$.isProfile":true}},{new:true})
        return product
    }
}

module.exports = new ProductsRepository()