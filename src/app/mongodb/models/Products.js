const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    category:{type:String, enum:['combinados','gourmet','hamburguer','frango','filet-mignon','naturais', 'crepe','porcoes', 'acai','bebidas','sobremesas'],required:true},
    name:{type:String, required:true},
    items:[
        {
            name:{type:String, required:true},
            isAvailable:{type:Boolean, default: true,required:true},
            description:{type:String},
            price:{type:Number, required:true}
        }
    ]
})

module.exports = mongoose.model('Products', schema)