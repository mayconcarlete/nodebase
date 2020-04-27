const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    name:{type:String, required:true},
    category:{type:String, enum:['Carnes', 'Frios','Extras', 'Vegetais', 'Paes']},
    isAvailable:{type:Boolean, default:true, required:true}
})

module.exports = mongoose.model('ProductsItems', schema)