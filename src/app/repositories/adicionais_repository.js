const AdicionaisProducts = require('../mongodb/models/AdicionaisProducts')

class AdicionaisProductsRepostory{
    async index(){
        const getAllAdicionais = await AdicionaisProducts.find()
        return getAllAdicionais
    }
    async store(adicional){
        const newAdicional = await AdicionaisProducts.create(adicional)
        return newAdicional
    }
}

module.exports = new AdicionaisProductsRepostory()