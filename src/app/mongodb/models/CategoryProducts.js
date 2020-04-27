const mongoose = require('mongoose')
const Schema = mongoose.Schema

//CATEGORY MODEL
const schema = new Schema({
    slugName:{type:String, required:true}, //Nome que será criado para fazer pesquisas
    displayName:{type:String, required:true},//nome que será exibido no aplicativo
    imgUrl:{type:String},//Link para imagem que será mostrado no menu categoria
    isAvailable: {type:Boolean, default:false, required:true}//se categoria está dispnivel
}, {timestamps:true})

module.exports = mongoose.model('Category', schema)

