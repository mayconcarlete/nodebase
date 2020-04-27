const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    isAvailable:{type:Boolean,default:true, required:true },
    category:{type:String, enum:['carnes','queijos','vegetais','paes','extras','frios'],required:true},
})

module.exports = mongoose.model('AdicionaisProducts', schema)