const yupService = require('../services/yup_service')
const productItemsRepository = require('../repositories/products_items_repository')
class ProductsItemsController{
    async store(req, res){
       try{
        const validateBody = await yupService.productsItems(req.body)
        if(!validateBody){
            return res.status(400).json('Invalid Param.')
        }
        const newitem = await productItemsRepository.store(req.body)
        return res.json(newitem)
    }catch(err){
        return res.status(500).json(err)
    }
}
    async index(req, res){
        try{
            const productsItems = await productItemsRepository.index()
            return res.json(productsItems)
        }catch(error){
            return res.status(500).json(error)
        }
    }
    async show(req, res){
        try{
            const id = req.params.id
            const productItem = await productItemsRepository.show(id)
            return res.json(productItem)
        }catch(error){
            return res.status(500).json(error)
        }
    }
async edit(req, res){
    const id = req.params.id
    const requiredFields = ['name', 'category']
    try{
        for(const field of requiredFields){
            if(!req.body[field]){
                return res.status(400).json({missingParamName:field})
            }
        }
        const updatedProductItem = await productItemsRepository.edit(id, req.body)
        return res.json(updatedProductItem)
    }catch(error){
        return res.status(500).json(error)
    }
}
async delete(req, res){
    const id =req.params.id
    try{
        const productItemDeleted = await productItemsRepository.delete(id)
        return res.json(productItemDeleted)
    }catch(error){
        return res.status(500).json(error)
    }
}
}

module.exports = new ProductsItemsController()