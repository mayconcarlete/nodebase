const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isDeleted: { type: Boolean, default: false, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  roles: { type: String, enum: ['admin', 'user'], default: 'user', required: true }
})

module.exports = mongoose.model('User', schema)
