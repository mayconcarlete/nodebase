const productRepository =  require('../repositories/products_repository')

class ProductsController{
    async store(req, res){
        try{
        const {category,name,price,description,isAvailable, items} = req.body
        const enumFields = ['promocao','combinados','gourmet','hamburguer','frango','filet-mignon','naturais', 'crepe','porcoes', 'acai','bebidas','sobremesas']
        if(!enumFields.includes(req.body.category)){
           return res.status(400).json({
               error: 'Invalid Param',
               paramInvalid: req.body.category
           })
       }
       const product = {
           category, name, price, description, isAvailable,items
       }
   
       const newProduct = await productRepository.store(product)
       return res.json(newProduct)
    }catch(error){
        return res.status(500).json(error)
    }
    }
}
module.exports = new ProductsController()