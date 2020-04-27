const upload = require('../services/image-uploader/google-cloud-storage')
const productsRepository = require('../repositories/products_repository')
class UploadImagesController{
    async store(req, res, next) {
        const id = req.params.id      
        try{
            if(!req.files || req.files.length ===0){
                return res.status(401).json('A file must be provided')
            }
            console.log(`req files: ${req.files.length}`)
            if(req.files.length > 3){
                return res.status(401).json('You cant upload more than 3 images')
            }
            const getProduct = await productsRepository.show(id)
            if(!getProduct){
                return res.status(401).json('Produto não encontrado')
            }
            if(getProduct.urlArr.length > 3){
                return res.status(401).json('Limite máximo de foto por produto')
            }
          // const checkBucket = await upload.checkBucket(req.params.category, req.params.name)
          const imgUrlArray = req.files.map(async(file)=>{
               const result = await upload.uploadImage(file, getProduct.category._id, getProduct.shortName)
               return result
            })
            
            await Promise.all(imgUrlArray).then(async(complete)=>{
                const urlFormat = complete.map((url)=>{
                    return {
                        imgUrl:url
                    }
                })
                console.log(urlFormat)
                const productWithImage = await productsRepository.uploadImage(id, urlFormat)
                return res.json(productWithImage)
            })
            
        }catch(err){
            console.log(`Deu erro: ${err}`)
            return res.status(500).json(err)
            //next(e)
        }    
    }
 
    async setIsProfile(req, res){
        const { urlid} = req.params
        try{
        const setImageAsProfile = await productsRepository.getProfileData(urlid)
        return res.json(setImageAsProfile)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = new UploadImagesController()