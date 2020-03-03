const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, require:true},
    password:{type:String, required:true},
    roles:{type:String, enum:['admin', 'user'], default:'user', required:true},
    address:[{type: Schema.Types.ObjectId, ref:'Address'}]
})

module.exports = mongoose.model('User', schema)