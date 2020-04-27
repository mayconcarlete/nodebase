class MulterValidation{
    async checkFields(req,res,next){
       console.log(req.path.file)
        return res.json(req.files)
    }
}

module.exports= new MulterValidation()