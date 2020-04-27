const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    name:{type:String, required:true},
    category:{type:Schema.Types.ObjectId ,ref:'Category',required:true},
    shortName:{type:String, required:true},
    urlArr:[
        {
            imgUrl:{type:String,required:true},
            isProfile:{type: Boolean, default:false, required:true}
        }
    ],
    price:{type:Number, required:true},
    description:{type:String},
    isAvailable:{type:Boolean, default:true, required:true},
    items:[{type:Schema.Types.ObjectId, ref:'ProductsItems'}]
},
{timestamps:true}
)

module.exports = mongoose.model('Products', schema)