const yup = require('yup')

exports.checkProducts = async (req, res, next) => {
   const schema = yup.object().shape({
       category:yup.string().required(),
       name:yup.string().required(),
       price: yup.string().required(),
       description:yup.string(),
       isAvailable:yup.string(),
       items:yup.array().of(yup.object().shape({
        name:yup.string().required(),
        isAvailable:yup.string()
    }
    )
    ).required()
   })
 const result = await schema.validate(req.body).catch(errors=>{
     return res.status(400).json(errors)
    
    })
 next()
}