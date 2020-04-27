const productRepository =  require('../repositories/products_repository')

class ProductsController{
    async store(req, res){
        try{
        const {category,name,price,description,isAvailable, items} = req.body
         const product = {
           shortName:name.replace(/ /g,'-').toLowerCase(),
           category, 
           name, 
           price, 
           description, 
           isAvailable,
           items
       }
   
       const newProduct = await productRepository.store(product)
       return res.json(newProduct)
    }catch(error){
        return res.status(500).json(error)
    }
    }

    async show(req, res){
      try{
        const productId = req.params.id
      const product = await productRepository.show(productId)
      if(!product){
          return res.status(400).json({msg:'Erro nenhum produto encontrado'})
      }
      return res.json(product)
      }catch(error){
          return res.status(500).json('Server error')
      }
    }

    async index(req, res){
        try{
        const products = await productRepository.index()
        return res.json(products)
        }catch(error){
            return res.status(500).json('Internal Error')
        }

    }
}
module.exports = new ProductsController()