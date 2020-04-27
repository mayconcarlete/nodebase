const yupService= require('../services/yup_service')
const adicionaisProductsRepostory = require('../repositories/adicionais_repository')
class AdicionaisProductsController{
    async index(req, res){
        try{
        const getAllAdicionais = await adicionaisProductsRepostory.index()
        return res.json(getAllAdicionais)
        }catch(err){
            return res.status(500).json(err)
        }
    }
    async store(req, res){
      try{
        const validateData = await yupService.checkAdicionais(req.body)
       if(!validateData){
           return res.status(401).json("Invalid Param")
       }
       const newAdicional = await adicionaisProductsRepostory.store(req.body)
       return res.json(newAdicional)
    }catch(err){
        return res.status(500).json(err)
    }
}
   
}

module.exports = new AdicionaisProductsController()